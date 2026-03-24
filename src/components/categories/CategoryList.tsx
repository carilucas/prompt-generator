"use client";

import { useRouter } from "next/navigation";

type Category = {
  id: string;
  name: string;
  key: string;
  profile: {
    experience: string;
    roles: string;
    strength: string;
  } | null;
};

export function CategoryList({ categories }: { categories: Category[] }) {
  const router = useRouter();

  if (!categories.length) {
    return <p>No categories yet</p>;
  }

  return (
    <div className="space-y-4 mb-10">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border p-4 rounded space-y-2 border-gray-300 bg-gray-100 shadow-sm"
        >
          <div className="flex justify-between">
            <h2 className="font-semibold">{cat.name}</h2>

            <button
              onClick={() => router.push(`/dashboard/categories/${cat.id}`)}
              className="text-sm text-white bg-sky-900 px-5 py-1 rounded cursor-pointer"
            >
              Edit
            </button>
          </div>

          <p className="text-sm text-gray-500">key: {cat.key}</p>

          <div className="text-sm space-y-1">
            <p>
              <strong>Experience:</strong> {cat.profile?.experience}
            </p>
            <p>
              <strong>Roles:</strong> {cat.profile?.roles}
            </p>
            <p>
              <strong>Strength:</strong> {cat.profile?.strength}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
