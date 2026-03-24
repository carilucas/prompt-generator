
import { getCurrentUser } from "@/lib/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Props {
    params: Promise<{ id: string }>;
}

export async function PATCH(
    req: Request,
    { params }: Props
) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }



        const { name, key, profile } = await req.json();
        const { id } = await params;
        if (!name || !key || !profile) {
            return NextResponse.json(
                { error: "Missing fields" },
                { status: 400 }
            );
        }

        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name,
                key,
                profile: {
                    update: {
                        experience: profile.experience,
                        roles: profile.roles,
                        strength: profile.strength,
                    },
                },
            },
            include: { profile: true },
        });

        return NextResponse.json(updatedCategory);

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error updating category" },
            { status: 500 }
        );
    }
}