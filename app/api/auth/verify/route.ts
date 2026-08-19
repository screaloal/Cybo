import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();
    if (!token)
      return NextResponse.json({ error: 'Invalid token.' }, { status: 400 });

    const user = await prisma.user.findFirst({
      where: { verificationToken: token }
    });

    if (!user)
      return NextResponse.json({ error: 'Invalid or expired verification link.' }, { status: 400 });

    if (user.verificationExpiry && user.verificationExpiry < new Date())
      return NextResponse.json({ error: 'Verification link has expired. Please register again.' }, { status: 400 });

    if (user.status === 'ACTIVE')
      return NextResponse.json({ message: 'Account already verified.' });

    await prisma.user.update({
      where: { id: user.id },
      data: {
        status: 'ACTIVE',
        verificationToken: null,
        verificationExpiry: null,
      }
    });

    return NextResponse.json({ message: 'Account verified successfully.' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error.' }, { status: 500 });
  }
}
