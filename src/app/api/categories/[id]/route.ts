
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
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }



        const { name, key, profile } = await req.json();
        const { id } = await params;
        if (!name || !key || !profile) {
            return NextResponse.json(
                { message: "Missing fields", ok: false },
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

        return NextResponse.json({
            updatedCategory,
            message: 'Yeah! skill updated.',
            ok: true
        },
            { status: 200 }
        );

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { message: "Error updating category", ok: false },
            { status: 500 }
        );
    }
}


export async function DELETE(
    req: Request,
    { params }: Props
) {
    try {

        const { id } = await params;
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json(
                { message: "Unauthorized", ok: false },
                { status: 401 }
            );
        }


        const category = await prisma.category.update({
            where: {
                id: id,
                userId: user.userId,
            },
            data: {
                deletedAt: new Date(),
            },
        });

        return NextResponse.json({
            category,
            message: 'Skill deleted',
            ok: true,
        },
            { status: 200 }
        );

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: "Error deleting category", ok: false },
            { status: 500 }
        );
    }
}