"use client";
import { useState } from "react";
import { CheckBox } from "@/components";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export function PromptRow({ prompt }: any) {
  const [boosted, setBoosted] = useState(prompt.boosted || 0);
  const [connects, setConnects] = useState(prompt.connects || 0);
  const [viewed, setViewed] = useState(prompt.viewed || false);
  const [answered, setAnswered] = useState(prompt.answered || false);
  const [won, setWon] = useState(prompt.won || false);

  const router = useRouter();
  const handleUpdate = async () => {
    await fetch(`/api/prompts/${prompt.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        boosted,
        connects,
        viewed,
        answered,
        won,
      }),
    });
    Swal.fire({
      title: "Success",
      html: "Your data has been updated.",
      confirmButtonColor: "#024a70",
      timer: 1000,
      timerProgressBar: true,
    });
  };

  async function handleDelete(id: string) {
    const result = await Swal.fire({
      title: "Delete prompt?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    const res = await fetch(`/api/prompts/${id}`, {
      method: "DELETE",
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
  }

  return (
    <tr className="text-sm border-t">
      <td className="p-2 border border-gray-300">
        {prompt.category?.name.charAt(0).toUpperCase() +
          prompt.category?.name.slice(1).toLowerCase()}
      </td>

      <td className="p-2 border border-gray-300">
        {prompt.title.slice(0, 50)}...
      </td>

      <td className="p-2 border border-gray-300">
        <input
          type="number"
          value={boosted}
          onChange={(e) => setBoosted(Number(e.target.value))}
          className="w-16 border border-gray-300 rounded px-1 m-auto block"
          min={0}
        />
      </td>

      <td className="p-2 border border-gray-300">
        <input
          type="number"
          value={connects}
          onChange={(e) => setConnects(Number(e.target.value))}
          className="w-16 border border-gray-300 rounded px-1 m-auto block"
          min={0}
        />
      </td>

      <td className="p-2 border border-gray-300">
        <CheckBox checked={viewed} onChange={(checked) => setViewed(checked)} />
      </td>

      <td className="p-2 border border-gray-300">
        <CheckBox
          checked={answered}
          onChange={(checked) => setAnswered(checked)}
        />
      </td>

      <td className="p-2 border border-gray-300">
        <CheckBox checked={won} onChange={(checked) => setWon(checked)} />
      </td>

      <td className="p-2 border border-gray-300">
        <div className="flex flex-col gap-2">
          <button
            onClick={handleUpdate}
            className="text-white bg-sky-900 px-3 py-1 rounded text-sm cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => handleDelete(prompt.id)}
            className="bg-red-500 text-white px-3 py-1 text-sm rounded cursor-pointer"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
