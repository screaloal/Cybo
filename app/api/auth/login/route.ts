import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';
import { loginLimit } from '@/lib/ratelimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? 'anonymous';
    const { success, remaining } = await loginLimit(ip);

    if (!success) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again in 15 minutes.' },
        { status: 429 }
      );
    }

    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });

    if (user.status === 'SUSPENDED')
      return NextResponse.json({ error: 'Account suspended. Contact support.' }, { status: 403 });

    if (user.status === 'BANNED')
      return NextResponse.json({ error: 'Account permanently banned.' }, { status: 403 });

    if (user.failedLoginAttempts >= 5)
      return NextResponse.json({ error: 'Account locked. Too many failed attempts.' }, { status: 423 });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      await prisma.user.update({
        where: { id: user.id },
        data: { failedLoginAttempts: { increment: 1 } }
      });
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lastLoginAt: new Date() }
    });

    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username }
    });
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
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
