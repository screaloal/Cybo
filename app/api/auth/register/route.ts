import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password, username } = await req.json();
    if (!email || !password || !username)
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    if (password.length < 6)
      return NextResponse.json({ error: 'Password min 6 characters' }, { status: 400 });
    const exists = await prisma.user.findFirst({ where: { OR: [{ email }, { username }] } });
    if (exists)
      return NextResponse.json({ error: 'Email or username already taken' }, { status: 409 });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({ data: { email, username, passwordHash } });
    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({
      message: 'Account created',
      user: { id: user.id, email: user.email, username: user.username }
    }, { status: 201 });
    res.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 604800, path: '/' });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
