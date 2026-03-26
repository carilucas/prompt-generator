"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import { BoostedPieSlice, ViewedPieSlice } from "./CustomPieSlice";

const chartTheme = {
  primary: "#000000",
  success: "oklch(39.1% 0.09 240.876)",
  danger: "#EF4444",
  info: "#3B82F6",
  blue1: "oklch(45% 0.085 224.283)",
  blue2: "oklch(39.1% 0.09 240.876)",
  blue3: "oklch(29.3% 0.066 243.157)",
};
export default function Charts({
  data,
  viewedStats,
  boostedStats,
  totalVsWon,
  funnelStats,
  boostPerformance,
}: any) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 📈 Prompts por día */}
      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-1 font-semibold">Total proposals vs won proposals</h3>
        <p className="mb-3 text-sm">
          Del total de propuestas enviadas cuantas has ganado?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={totalVsWon}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valueTotal" fill={chartTheme.blue1} />
            <Bar dataKey="valueWon" fill={chartTheme.blue3} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Boosted vs not boosted</h3>
        <p className="mb-3 text-sm">
          Cuantas propuestas has impulsado con connects extras?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={boostedStats}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              shape={<BoostedPieSlice />}
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Total vs Answered vs won</h3>
        <p className="mb-3 text-sm">
          Del total de propuestas cuantas te respondieron y cuantas has ganado?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={funnelStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="valueTotal" fill={chartTheme.blue1} />
            <Bar dataKey="valueAnswered" fill={chartTheme.blue2} />
            <Bar dataKey="valueWon" fill={chartTheme.blue3} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Boost Performance</h3>
        <p className="mb-3 text-sm">
          Que porcentaje de tus propuestas impulsadas han ganado comparado con
          las no impulsadas?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={boostPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="winRate" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Prompts per Day</h3>
        <p className="mb-3 text-sm">Cuantas propuestas has enviado por día?</p>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke={chartTheme.success} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 🥧 Viewed vs Not */}
      <div className="border p-4 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Viewed Ratio</h3>
        <p className="mb-3 text-sm">
          Del total de propuestas enviadas cuantas fueron vistas por los
          clientes?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={viewedStats}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
              shape={<ViewedPieSlice />}
            />

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 📊 Connects promedio */}
      <div className="border p-4 lg:col-span-2 border-gray-300 rounded">
        <h3 className="mb-2 font-semibold">Avg Connects per Day</h3>
        <p className="mb-3 text-sm">
          Cuantos connects en promedio has usado por día en tus propuestas?
        </p>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="avgConnects" fill={chartTheme.success} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
