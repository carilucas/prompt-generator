"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

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
  const [key, setKey] = useState("");

  if (!categories.length) {
    return <p>No categories yet</p>;
  }

  const onHandleDelete = async ({ id, key }: { id: string; key: string }) => {
    const result = await Swal.fire({
      title: "Delete skill?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ key }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.refresh();

      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1000,
        showConfirmButton: false,
      });
    }

    router.refresh();
  };
  return (
    <div className="space-y-4 mb-10">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border p-4 rounded space-y-2 border-gray-300 bg-gray-100 shadow-sm"
        >
          <div className="flex justify-between">
            <h2 className="font-semibold">
              {cat?.name.charAt(0).toUpperCase() +
                cat.name.slice(1).toLowerCase()}
            </h2>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => router.push(`/dashboard/categories/${cat.id}`)}
                className="text-sm text-white bg-sky-900 px-5 py-1 rounded cursor-pointer"
              >
                Edit
              </button>
              <button
                onClick={() => onHandleDelete({ id: cat.id, key: cat.key })}
                className="bg-red-500 text-white px-3 py-1 text-sm rounded cursor-pointer"
              >
                Delete
              </button>
            </div>
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
