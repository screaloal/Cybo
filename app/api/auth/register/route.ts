import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { registerLimit } from '@/lib/ratelimit';
import { sendVerificationEmail } from '@/lib/email';
import { validatePassword } from '@/lib/password';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
    const { success } = await registerLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please try again in 1 hour.' },
        { status: 429 }
      );
    }

    const { email, password, username } = await req.json();

    if (!email || !password || !username)
      return NextResponse.json({ error: 'All fields required.' }, { status: 400 });

    const { valid, message } = validatePassword(password);
    if (!valid)
      return NextResponse.json({ error: message }, { status: 400 });

    if (username.length < 3)
      return NextResponse.json({ error: 'Username must be at least 3 characters.' }, { status: 400 });

    if (!/^[a-zA-Z0-9_]+$/.test(username))
      return NextResponse.json({ error: 'Username can only contain letters, numbers and underscores.' }, { status: 400 });

    const exists = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });
    if (exists)
      return NextResponse.json({ error: 'Email or username already taken.' }, { status: 409 });

    const passwordHash = await bcrypt.hash(password, 12);
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        passwordHash,
        verificationToken,
        verificationExpiry,
      }
    });

    try {
      await sendVerificationEmail(email, username, verificationToken);
    } catch (emailError) {
      console.error('Email send failed:', emailError);
    }

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({
      message: 'Account created. Please check your email to verify your account.',
      user: { id: user.id, email: user.email, username: user.username }
    }, { status: 201 });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 604800,
      path: '/'
    });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
