#!/bin/bash
echo "🚀 CyberNet v1 Backend Setup"
cd ~/Cybo

echo "📦 Installing jose..."
npm install jose

echo "📝 Updating schema to SQLite..."
cat > prisma/schema.prisma << 'SCHEMAEOF'
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  VIP
  SUPERUSER
}

enum Status {
  ACTIVE
  SUSPENDED
  PENDING_VERIFICATION
}

model User {
  id                  String    @id @default(uuid())
  email               String    @unique
  username            String    @unique
  passwordHash        String
  role                Role      @default(USER)
  status              Status    @default(PENDING_VERIFICATION)
  createdAt           DateTime  @default(now())
  updatedAt           DateTime  @updatedAt
  lastLoginAt         DateTime?
  failedLoginAttempts Int       @default(0)
  displayName         String?
  bio                 String?
  avatarUrl           String?

  @@index([email, username])
}
SCHEMAEOF

echo "🔑 Creating .env..."
cat > .env << 'ENVEOF'
DATABASE_URL="file:./dev.db"
JWT_SECRET="cybernet-super-secret-key-2024"
ENVEOF

echo "🗄️ Creating lib/prisma.ts..."
mkdir -p lib
cat > lib/prisma.ts << 'PRISMAEOF'
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };
export const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
PRISMAEOF

echo "🔐 Creating lib/auth.ts..."
cat > lib/auth.ts << 'AUTHEOF'
import { SignJWT, jwtVerify } from 'jose';

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'fallback');

export async function signToken(payload: { userId: string; email: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret());
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload as unknown as { userId: string; email: string; role: string };
  } catch {
    return null;
  }
}
AUTHEOF

echo "📡 Creating register route..."
mkdir -p app/api/auth/register
cat > app/api/auth/register/route.ts << 'REGEOF'
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
REGEOF

echo "📡 Creating login route..."
mkdir -p app/api/auth/login
cat > app/api/auth/login/route.ts << 'LOGINEOF'
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email || !password)
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    if (user.status === 'SUSPENDED')
      return NextResponse.json({ error: 'Account suspended. Contact support.' }, { status: 403 });
    if (user.failedLoginAttempts >= 5)
      return NextResponse.json({ error: 'Account locked. Too many failed attempts.' }, { status: 423 });
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      await prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: { increment: 1 } } });
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }
    await prisma.user.update({ where: { id: user.id }, data: { failedLoginAttempts: 0, lastLoginAt: new Date() } });
    const token = await signToken({ userId: user.id, email: user.email, role: user.role });
    const res = NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, username: user.username }
    });
    res.cookies.set('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 604800, path: '/' });
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
LOGINEOF

echo "📡 Creating logout route..."
mkdir -p app/api/auth/logout
cat > app/api/auth/logout/route.ts << 'LOGEOF'
import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' });
  res.cookies.set('token', '', { maxAge: 0, path: '/' });
  return res;
}
LOGEOF

echo "🛡️ Creating middleware..."
cat > middleware.ts << 'MIDEOF'
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'fallback');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/auth', req.url));
    try { await jwtVerify(token, secret()); }
    catch { return NextResponse.redirect(new URL('/auth', req.url)); }
  }

  if (pathname === '/auth' && token) {
    try {
      await jwtVerify(token, secret());
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch {}
  }

  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/auth'] };
MIDEOF

echo "🗃️ Pushing database schema..."
npx prisma db push

echo "⚙️ Generating Prisma client..."
npx prisma generate

echo ""
echo "✅ Backend setup complete!"
echo "  ✓ prisma/schema.prisma (SQLite)"
echo "  ✓ .env"
echo "  ✓ lib/prisma.ts"
echo "  ✓ lib/auth.ts"
echo "  ✓ app/api/auth/register/route.ts"
echo "  ✓ app/api/auth/login/route.ts"
echo "  ✓ app/api/auth/logout/route.ts"
echo "  ✓ middleware.ts"
