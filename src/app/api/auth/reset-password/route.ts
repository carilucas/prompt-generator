import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token, password } = await req.json();

    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const record = await prisma.passwordResetToken.findUnique({
        where: { tokenHash },
    });

    if (!record) {
        return NextResponse.json(
            { error: "Invalid token" },
            { status: 400 }
        );
    }

    if (record.expiresAt < new Date()) {
        return NextResponse.json(
            { error: "Token expired" },
            { status: 400 }
        );
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { id: record.userId },
        data: { password: hashed },
    });

    await prisma.passwordResetToken.delete({
        where: { id: record.id },
    });

    return NextResponse.json({ ok: true });
}