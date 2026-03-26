import { StatsCards, PromptTable } from "@/components/";
import { Charts } from "@/components/stats/ChartsClient";
import { comparedStats } from "@/lib/comparedStats";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { getStats } from "@/lib/getStats";
import { groupByDate } from "@/lib/groupByDate";
import { redirect } from "next/navigation";

interface StatsPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

export default async function StatsPage({ searchParams }: StatsPageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  const page = Number((await searchParams).page || 1);
  const limit = Number((await searchParams).limit || 10);

  const skip = (page - 1) * limit;

  // 📊 Queries en paralelo
  const [
    comparedPrompts,
    allPrompts,
    prompts,
    total,
    viewedCount,
    wonCount,
    connectsAvg,
  ] = await getStats({
    userId: user.userId,
    skip,
    limit,
  });

  const chartData = groupByDate(allPrompts);
  const [viewedStats, boostedStats, totalVsWon, funnelStats, boostPerformance] =
    comparedStats(comparedPrompts, allPrompts);

  const metrics = {
    total,
    viewedRate: total ? (viewedCount / total) * 100 : 0,
    wonRate: total ? (wonCount / total) * 100 : 0,
    avgConnects: connectsAvg._avg.connects || 0,
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <StatsCards metrics={metrics} />
      <Charts
        data={chartData}
        viewedStats={viewedStats}
        boostedStats={boostedStats}
        totalVsWon={totalVsWon}
        funnelStats={funnelStats}
        boostPerformance={boostPerformance}
      />
      <PromptTable prompts={prompts} total={total} page={page} limit={limit} />
    </div>
  );
}
