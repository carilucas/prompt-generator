import { prisma } from "@/lib/prisma";
import { PromptTable } from "@/components";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
};

export default async function StatsPage({ searchParams }: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const page = Number((await searchParams).page || 1);
  const limit = Number((await searchParams).limit || 10);

  const skip = (page - 1) * limit;

  const [prompts, total] = await Promise.all([
    prisma.promptLog.findMany({
      where: { userId: user.userId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.promptLog.count({
      where: { userId: user.userId },
    }),
  ]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Prompt History</h1>

      <PromptTable prompts={prompts} total={total} page={page} limit={limit} />
    </div>
  );
}
