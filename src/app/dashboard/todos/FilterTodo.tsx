"use client";
import React, {useCallback, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarClockIcon, CircleHelp, Clock3, Component, ListFilter, StretchVertical} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Category} from "@/app/types/category";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const FilterTodo = ({categories}: {categories: Category[]}) => {
  const {replace} = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
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
                <div className="w-6 h-6 rounded bg-gray-300 flex justify-center items-center">
                  <ListFilter className="w-5" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Filter</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] border border-gray-300 bg-background shadow-lg">
          <div className="flex justify-between items-center border-b border-gray-300 pb-1">
            <div className="font-semibold text-sm">Filter By</div>
            <CircleHelp className="w-4" />
          </div>
          <div className="py-1 rounded flex flex-col justify-center">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <Component className="w-4" />
                <div>Categories</div>
              </div>
              <Select onValueChange={(value) => createQueryString("category", value)} defaultValue={searchParams.get("category")?.toString() || "all"}>
                <SelectTrigger className="w-3/6 border-0 bg-transparent">
                  <SelectValue placeholder="Categories" />
                </SelectTrigger>
                <SelectContent className="bg-background  border border-gray-300">
                  <SelectItem className="hover:text-gray-700" value="all">
                    All(default)
                  </SelectItem>

                  {categories?.map((cat: Category, i: number) => (
                    <SelectItem value={cat?.name} key={i} className="capitalize">
                      {cat?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-1">
                <CalendarClockIcon className="w-4" />
                <div>Reminder</div>
              </div>
              <Select onValueChange={(value) => createQueryString("reminder", value)} defaultValue={searchParams.get("reminder")?.toString() || "all"}>
                <SelectTrigger className="w-3/6 border-0 bg-transparent">
                  <SelectValue placeholder="Reminder" />
                </SelectTrigger>
                <SelectContent className="bg-background border border-gray-300">
                  <SelectItem value="all">All(default)</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-30">Next 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterTodo;
