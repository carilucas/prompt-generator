import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }

        const rules = await prisma.rule.findMany({
            where: { userId: user.userId },
            orderBy: { order: "asc" },
        });

        return NextResponse.json({
            rules,
            ok: true
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Error fetching rules", ok: false },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }

        const { rules } = await req.json();

        if (!Array.isArray(rules)) {
            return NextResponse.json(
                { message: "Rules must be an array", ok: false },
                { status: 400 }
            );
        }

        await prisma.rule.deleteMany({
            where: { userId: user.userId }
        });

        if (rules.length > 0) {
            await prisma.rule.createMany({
                data: rules.map((rule: { content: string }, index: number) => ({
                    content: rule.content,
                    order: index,
                    userId: user.userId,
                })),
            });
        }

        const savedRules = await prisma.rule.findMany({
            where: { userId: user.userId },
            orderBy: { order: "asc" },
        });

        return NextResponse.json({
            rules: savedRules,
            message: "Rules saved successfully",
            ok: true
        });
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Error saving rules", ok: false },
            { status: 500 }
        );
    }
}