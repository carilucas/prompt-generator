"use client";

import { useRouter } from "next/navigation";

import { PromptRow } from "@/components";

export function PromptTable({ prompts, total, page, limit }: any) {
  const router = useRouter();

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}&limit=${limit}`);
  };

  const handleLimitChange = (newLimit: number) => {
    router.push(`?page=1&limit=${newLimit}`);
  };

  return (
    <div className="space-y-4">
      {/* LIMIT SELECT */}
      <select
        value={limit}
        onChange={(e) => handleLimitChange(Number(e.target.value))}
        className="border px-4 py-2 border-gray-300 rounded"
      >
        {[5, 10, 20, 50, 100].map((n) => (
          <option key={n} value={n}>
            Show {n}
          </option>
        ))}
      </select>

      {/* TABLE */}
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="p-2 border border-gray-300">Date</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Job</th>
            <th className="p-2 border border-gray-300">Boosted</th>
            <th className="p-2 border border-gray-300">Connects</th>
            <th className="p-2 border border-gray-300">Viewed</th>
            <th className="p-2 border border-gray-300">Answered</th>
            <th className="p-2 border border-gray-300">Won</th>
          </tr>
        </thead>

        <tbody>
          {prompts.map((p: any) => (
            <PromptRow key={p.id} prompt={p} />
          ))}
        </tbody>
      </table>

      {/* PAGINATION */}
      <div className="flex gap-2 mb-8">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-2 py-1 border cursor-pointer ${
              Number(p) === Number(page) ? "bg-black text-white" : ""
            }`}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
