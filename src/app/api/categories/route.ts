import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }

        const userId = user.userId;

        const { name, key, profile } = await req.json();


        if (!name || !key || !profile) {
            return NextResponse.json(
                { message: "Missing fields", ok: false },
                { status: 400 }
            );
        }


        const existingDeletedCategory = await prisma.category.findFirst({
            where: { userId, key, deletedAt: { not: null } }
        });

        let category;
        if (existingDeletedCategory) {
            category = await prisma.category.update({
                where: { id: existingDeletedCategory.id },
                data: {
                    deletedAt: null,
                    profile: {
                        update: {
                            experience: profile.experience,
                            roles: profile.roles,
                            strength: profile.strength,
                        },
                    },
                },
            });
            return NextResponse.json({
                category,
                message: 'Yeah! skill saved.',
                ok: true
            },
                { status: 200 });
        }

        const existingCategory = await prisma.category.findFirst({
            where: { key, userId }
        });

        if (existingCategory) {
            return NextResponse.json(
                { message: "You have already created this skill before.", ok: false },
                { status: 400 }
            );
        }

        category = await prisma.category.create({
            data: {
                name,
                key,
                userId,
                profile: {
                    create: profile,
                },
            },
            include: {
                profile: true,
            },
        });

        return NextResponse.json({
            category,
            message: 'Yeah! skill saved.',
            ok: true
        },
            { status: 200 });

    } catch (error) {

        return NextResponse.json(
            { message: "Error creating category", ok: false },
            { status: 500 }
        );
    }
}


export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json(
                { message: "userId required", ok: false },
                { status: 400 }
            );
        }

        const categories = await prisma.category.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json({
            categories,
            ok: true
        });
    } catch (error) {
        return NextResponse.json(
            { message: "Unknown error", ok: false },
            { status: 500 }
        )
    }

}