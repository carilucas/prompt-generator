"use client";

import Image from "next/image";
import {
  IoAppsOutline,
  IoBrowsersOutline,
  IoChevronBackCircleOutline,
  IoChevronForwardCircleOutline,
  IoLogoReact,
  IoStatsChartOutline,
} from "react-icons/io5";
import { LogoutButton, SidebarMenuItem } from "@/components";
import { IoMdClock } from "react-icons/io";
import { useState } from "react";

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

interface SidebarProps {
  userInfo: {
    name: string | null;
    email: string;
  };
}

export const Sidebar = ({ userInfo }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div
      id="menu"
      className={`max-w-15  min-h-screen bg-gray-900 text-slate-300 transition-all duration-300 ease-in-out fixed sm:relative top-0 left-0 ${isOpen && "max-w-75"}`}
    >
      <div id="logo" className={`my-4 px-2 ${isOpen && "px-6"}`}>
        <h1
          className={`text-lg md:text-2xl font-bold text-white flex justify-center  items-center gap-2 ${isOpen && "justify-start"}`}
        >
          <div className="flex justify-center items-center">
            <IoLogoReact className="text-3xl" />
          </div>
          <span className={` ${isOpen ? "block" : "hidden"}`}>UPG</span>
        </h1>
        <p className={`text-slate-500 text-sm  ${isOpen ? "block" : "hidden"}`}>
          Upwork Promt Generator
        </p>
      </div>
      <div id="profile" className={`px-6 py-6 ${isOpen ? "block" : "hidden"}`}>
        <p className="text-slate-500">Welcome back,</p>
        <a href="#" className="inline-flex space-x-2 items-center">
          <span>
            <Image
              className="rounded-full w-8 h-8"
              src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=128&q=80"
              alt="Profile Picture"
              width={80}
              height={80}
            />
          </span>
          <span className="text-sm md:text-base font-bold">
            {userInfo.name}
          </span>
        </a>
      </div>
      <div id="nav" className={`w-full px-1 ${isOpen ? "px-6 mt-0" : "mt-20"}`}>
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} isOpen={isOpen} />
        ))}
        <LogoutButton isOpen={isOpen} />
        <div
          className={`"bg-sky-800" w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150`}
        >
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-5 text-white cursor-pointer">
              {isOpen ? (
                <IoChevronBackCircleOutline size={25} onClick={toggleSidebar} />
              ) : (
                <IoChevronForwardCircleOutline
                  size={25}
                  onClick={toggleSidebar}
                />
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
