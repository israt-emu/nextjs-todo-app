"use client";

import React from "react";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {LogOut, LogOutIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
const LogoutButton = ({collapse}: any) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove("accessToken");
    router.push("/signin");
  };
  return collapse ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className=" p-2 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#404140] rounded-sm" onClick={handleLogout}>
            <LogOut className="w-5 text-emerald-800 dark:text-emerald-500" strokeWidth={2.3} />
          </div>
        </TooltipTrigger>
        <TooltipContent align="center" side="right" sideOffset={8} className={!collapse ? "hidden" : "inline-block"}>
          Logout
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <button onClick={handleLogout} className="py-1 px-2 rounded flex items-center justify-center bg-transparent border border-primary mt-2 text-primary">
      <LogOutIcon className="w-5" />
      <p className="ml-2 text-sm font-semibold">Logout</p>
    </button>
  );
};

export default LogoutButton;
