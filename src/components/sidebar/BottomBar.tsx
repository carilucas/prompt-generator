"use client";

import { IoMdClock } from "react-icons/io";
import {
  IoAppsOutline,
  IoBrowsersOutline,
  IoStatsChartOutline,
} from "react-icons/io5";
import { BottomBarMenuItem } from "./BottomBarMenuItem";

const menuItems = [
  {
    path: "/dashboard/prompt",
    icon: <IoBrowsersOutline size={40} />,
    title: "Prompt Gen",
    description: "Genera prompts para tus proyectos",
  },
  {
    path: "/dashboard/categories",
    icon: <IoAppsOutline size={40} />,
    title: "Skills",
    description: "Gestión de habilidades del freelancer",
  },
  {
    path: "/dashboard/stats",
    icon: <IoStatsChartOutline size={40} />,
    title: "Analytics",
    description: "Visualiza el rendimiento de tus prompts",
  },
  {
    path: "/dashboard/prompt/history",
    icon: <IoMdClock size={40} />,
    title: "History",
    description: "Visualiza el historial de tus prompts",
  },
];

export const BottomBar = () => {
  return (
    <div>
      <div
        className={`md:hidden w-full px-1 flex items-center justify-between bg-gray-900 text-slate-300 py-1 fixed bottom-0 left-0 z-10 `}
      >
        {menuItems.map((item) => (
          <BottomBarMenuItem key={item.path} {...item} />
        ))}
      </div>
    </div>
  );
};
