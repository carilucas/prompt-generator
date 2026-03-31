import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { token } = await req.json();

    const tokenHash = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const record = await prisma.passwordResetToken.findUnique({
        where: { tokenHash },
    });

    if (!record) {
        return NextResponse.json({ valid: false });
    }

    if (record.expiresAt < new Date()) {
        return NextResponse.json({ valid: false });
    }

    return NextResponse.json({ valid: true });
}