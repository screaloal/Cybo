import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = () => new TextEncoder().encode(process.env.JWT_SECRET || 'fallback');

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  if (pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith('/dashboard')) {
    if (!token) return NextResponse.redirect(new URL('/', req.url));
    try { await jwtVerify(token, secret()); }
    catch { return NextResponse.redirect(new URL('/', req.url)); }
  }

  return NextResponse.next();
}

export const config = { matcher: ['/dashboard/:path*', '/auth'] };
