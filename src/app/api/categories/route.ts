import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {

        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const userId = user.userId;

        const { name, key, profile } = await req.json();


        if (!name || !key || !profile) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const existingCategory = await prisma.category.findFirst({
            where: { key, userId }
        });

        if (existingCategory) {
            return NextResponse.json(
                { error: "Category key already exists for this user" },
                { status: 400 }
            );
        }


        const category = await prisma.category.create({
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

        return NextResponse.json(category);

    } catch (error) {

        return NextResponse.json(
            { error: "Error creating category" },
            { status: 500 }
        );
    }
}


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
            { error: "userId required" },
            { status: 400 }
        );
    }

    const categories = await prisma.category.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(categories);
}