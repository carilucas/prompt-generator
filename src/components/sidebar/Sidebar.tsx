import Image from "next/image";
import {
  IoAppsOutline,
  IoBrowsersOutline,
  IoLogoReact,
  IoStatsChartOutline,
} from "react-icons/io5";
import { LogoutButton, SidebarMenuItem } from "@/components";

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
];

interface SidebarProps {
  userInfo: {
    name: string | null;
    email: string;
  };
}

export const Sidebar = ({ userInfo }: SidebarProps) => {
  return (
    <div
      id="menu"
      className="bg-gray-900 min-h-screen z-10 text-slate-300 left-0 w-100 "
    >
      <div id="logo" className="my-4 px-6">
        <h1 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2">
          <IoLogoReact /> <span>UPG</span>
        </h1>
        <p className="text-slate-500 text-sm">Upwork Promt Generator</p>
      </div>
      <div id="profile" className="px-6 py-10">
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
      <div id="nav" className="w-full px-6">
        {menuItems.map((item) => (
          <SidebarMenuItem key={item.path} {...item} />
        ))}
        <LogoutButton />
      </div>
    </div>
  );
};
