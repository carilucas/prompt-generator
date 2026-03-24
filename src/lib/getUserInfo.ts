import { prisma } from "@/lib/prisma";

export const getUserInfo = async (userId: string) => {
    const user = await prisma.user.findFirst({
        where: { id: userId },
        select: {
            email: true,
            name: true,
        },
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};