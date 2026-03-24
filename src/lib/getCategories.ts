// lib/categories.ts
import { prisma } from "@/lib/prisma";

export async function getCategories(userId: string) {

    return prisma.category.findMany({
        where: { userId },
        include: { profile: true },
        orderBy: {
            name: 'desc'
        }
    });
}