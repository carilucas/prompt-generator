import { IoLogoReact } from "react-icons/io5";
import { LogoutButton } from "../auth/logout/LogoutButton";

export const TopBar = () => {
  return (
    <div className="md:hidden bg-gray-900 text-slate-300 px-4 py-1 flex items-center justify-between">
      <div id="logo">
        <h1
          className={`text-lg md:text-2xl font-bold text-white flex justify-start  items-center gap-2`}
        >
          <div className="flex justify-center items-center">
            <IoLogoReact className="text-3xl" />
          </div>
          <span>UPG</span>
        </h1>
        <p className={`text-slate-500 text-[10px] `}>Upwork Promt Generator</p>
      </div>
      <div className="flex items-center gap-4  justify-end">
        <LogoutButton />
      </div>
    </div>
  );
};
