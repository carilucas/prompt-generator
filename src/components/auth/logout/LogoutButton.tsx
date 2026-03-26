"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";

interface LogoutButtonProps {
  isOpen: boolean;
}

export function LogoutButton({ isOpen }: LogoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function handleLogout() {
    setLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/auth/login");
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150 cursor-pointer"
    >
      <div>
        <IoLogOutOutline className="text-red-500 text-2xl" />
      </div>
      <div className={`${isOpen ? "block" : "hidden"}`}>
        <span className="text-lg font-bold leading-5 text-red-500 ">
          {loading ? "Logging out..." : "Logout"}
        </span>
      </div>
    </button>
  );
}
