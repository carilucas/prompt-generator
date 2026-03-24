import { prisma } from "@/lib/prisma";

export async function getCategory(id: string) {


    return await prisma.category.findUnique({
        where: { id },
        include: { profile: true },
    });
}