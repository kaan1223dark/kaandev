import prisma from '@/libs/db/prisma';
import { logger } from '@/libs/utils/logger';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, username } = body || {};
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Missing email or password' },
        { status: 400 },
      );
    }

    // If user exists and already has local auth enabled, reject
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && (existing as any).localAuth) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
      where: { email },
      update: {
        passwordHash,
        localAuth: true,
        username: username ?? existing?.username,
      } as any,
      create: {
        email,
        passwordHash,
        localAuth: true,
        username: username ?? undefined,
        roles: {
          create: {
            role: {
              connect: { strapiRoleUuid: process.env.NEXT_PUBLIC_NO_ROLE_ID! },
            },
          },
        },
      } as any,
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (e) {
    logger.error('Register error', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
