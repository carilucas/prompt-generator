import { prisma } from "@/lib/prisma";
import { generateResetToken } from "@/lib/auth/reset-token";
import { sendResetEmail } from "@/lib/email/send-reset";
import { rateLimit } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email } = await req.json();

    if (!rateLimit(email)) {
        return NextResponse.json(
            { error: "Too many requests" },
            { status: 429 }
        );
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ ok: true });
    }

    const { token, tokenHash } = generateResetToken();

    const expires = new Date(Date.now() + 1000 * 60 * 60);

    await prisma.passwordResetToken.create({
        data: {
            tokenHash,
            userId: user.id,
            expiresAt: expires,
        },
    });

    const url = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${token}`;

    await sendResetEmail(email, url);

    return NextResponse.json({ ok: true });
}