import { prisma } from "@/lib/prisma";

interface StatsProps {
    userId: string,
    skip: number,
    limit: number

}
export const getStats = async ({ userId, skip, limit }: StatsProps) => {
    return await Promise.all([
        prisma.promptLog.findMany({
            where: { userId },
            select: {
                boosted: true,
                connects: true,
                answered: true,
                won: true,
                viewed: true,
                createdAt: true,
            },
        }),
        prisma.promptLog.findMany({
            where: { userId },
            select: {
                createdAt: true,
                viewed: true,
                connects: true,
            },
        }),
        prisma.promptLog.findMany({
            where: { userId },
            include: { category: true },
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
        }),

        prisma.promptLog.count({
            where: { userId },
        }),

        prisma.promptLog.count({
            where: { userId, viewed: true },
        }),

        prisma.promptLog.count({
            where: { userId, won: true },
        }),

        prisma.promptLog.aggregate({
            where: { userId },
            _avg: {
                connects: true,
            },
        }),
    ]);
}