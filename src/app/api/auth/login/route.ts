import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from 'next/headers'

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // buscar usuario
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // comparar password
        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        // actualizar lastLogin (opcional pero PRO)
        await prisma.user.update({
            where: { id: user.id },
            data: {
                lastLogin: new Date(),
            },
        });

        const cookieStore = await cookies();

        cookieStore.set("session", JSON.stringify({
            userId: user.id,
            role: user.role,
        }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return NextResponse.json({
            message: "Login successful",
            userId: user.id,
            role: user.role,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}