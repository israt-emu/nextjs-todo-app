"use client";
import React, {useCallback, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {ArrowDownUp, Calendar, CircleHelp, Clock3} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
const SortingTodo = () => {
  const {replace} = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (orderBy: string, order: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("orderBy", orderBy);
      params.set("order", order);
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );
  return (
    <div className="flex items-center gap-1">
      <Popover>
        <PopoverTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="filter-icon">
                  <ArrowDownUp className="w-4 sm:w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sorting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] border border-gray-300 bg-background shadow-lg">
          <div className="flex justify-between items-center border-b border-gray-300 pb-1">
            <div className="font-semibold text-sm">Sort By</div>
            <CircleHelp className="w-4" />
          </div>
          <div className="py-1 rounded flex flex-col justify-center">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Calendar className="w-4" />
                <div>Added Date</div>
              </div>
              <Select onValueChange={(value) => createQueryString("createdAt", value)} defaultValue="desc">
                <SelectTrigger className="w-3/6 border-0 bg-transparent">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Clock3 className="w-4" />
                <div>Reminder</div>
              </div>
              <Select onValueChange={(value) => createQueryString("reminder", value)}>
                <SelectTrigger className="w-3/6 border-0 bg-transparent">
                  <SelectValue placeholder="Select Order" />
                </SelectTrigger>
                <SelectContent className="bg-background">
                  <SelectItem value="asc">Ascending</SelectItem>
                  <SelectItem value="desc">Descending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortingTodo;
