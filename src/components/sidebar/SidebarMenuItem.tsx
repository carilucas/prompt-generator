"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react";

interface SidebarMenuItemProps {
  path: string;
  title: string;
  description: string;
  icon: JSX.Element;
}

export const SidebarMenuItem = ({
  path,
  title,
  description,
  icon,
}: SidebarMenuItemProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`${path === pathName && "bg-sky-800"} w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150`}
    >
      <div>{icon}</div>
      <div className="flex flex-col">
        <span className="text-lg font-bold leading-5 text-white">{title}</span>
        <span className="text-sm text-white/50 hidden md:block">
          {description}
        </span>
      </div>
    </Link>
  );
};
