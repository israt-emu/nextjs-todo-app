"use client";
import {Grid2X2, List} from "lucide-react";
import React, {useCallback, useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
const TodoView = () => {
  const [view, setView] = useState<string>("list");
  const {replace} = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
      setView(value);
    },
    [searchParams, pathname, replace]
  );
  return (
    <div>
      {view === "grid" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 rounded bg-gray-300 dark:bg-[#404140] flex justify-center items-center cursor-pointer" onClick={() => createQueryString("view", "list")}>
                <List className="w-4 sm:w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>List View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
      {view === "list" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="filter-icon" onClick={() => createQueryString("view", "grid")}>
                <Grid2X2 className="w-4 sm:w-5" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grid View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default TodoView;
