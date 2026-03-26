type Metrics = {
  total: number;
  viewedRate: number;
  wonRate: number;
  avgConnects: number;
};

export function StatsCards({ metrics }: { metrics: Metrics }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Card title="Total Prompts" value={metrics.total} />

      <Card title="Viewed %" value={`${metrics.viewedRate.toFixed(1)}%`} />

      <Card title="Won %" value={`${metrics.wonRate.toFixed(1)}%`} />

      <Card title="Avg Connects" value={metrics.avgConnects.toFixed(1)} />
    </div>
  );
}

function Card({ title, value }: any) {
  return (
    <div className="border p-4 rounded shadow-sm border-gray-300 bg-gray-50">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
