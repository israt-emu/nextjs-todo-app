"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import img from "../../../assets/avatar.png";
import {User} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";

const Avatar = ({user, collapse}: any) => {
  return collapse ? (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href="/dashboard/user-profile" className={cn("text-orange-700 dark:text-orange-500 p-2 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-[#404140] rounded-sm")}>
            <User />
          </Link>
        </TooltipTrigger>
        <TooltipContent align="center" side="right" sideOffset={8} className={!collapse ? "hidden" : "inline-block"}>
          Profile
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ) : (
    <div className="flex items-center p-2 mt-6 space-x-3 justify-self-end ">
      <Image src={user?.photo || img} width={50} height={50} alt="" className="w-12 h-12 rounded-lg dark:bg-gray-500 border border-gray-500" />
      <div>
        <h2 className="text-lg font-semibold">{user?.name}</h2>
        <span className="flex items-center space-x-1">
          <Link href="/dashboard/user-profile" className="text-xs hover:underline">
            View profile
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Avatar;
