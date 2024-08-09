"use client";
import {Grid2X2, List} from "lucide-react";
import React, {useState} from "react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
const TodoView = () => {
  const [view, setView] = useState<string>("list");
  return (
    <div>
      {view === "grid" && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="w-6 h-6 rounded bg-gray-300 flex justify-center items-center" onClick={() => setView("list")}>
                <List className="w-5" />
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
              <div className="w-6 h-6 rounded bg-gray-300 flex justify-center items-center" onClick={() => setView("grid")}>
                <Grid2X2 className="w-5" />
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
