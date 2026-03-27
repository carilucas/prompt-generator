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

export const BottomBarMenuItem = ({
  path,
  title,
  icon,
}: SidebarMenuItemProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={path}
      className={`${path === pathName && "bg-sky-800"} w-full space-x-2 flex flex-col items-center justify-center py-3`}
    >
      <div>{icon}</div>
      <div className={`flex flex-col items-center justify-center`}>
        <span className="text-[12px]  leading-5 text-white text-center">
          {title}
        </span>
      </div>
    </Link>
  );
};
