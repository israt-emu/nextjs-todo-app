"use client";
import {Search} from "lucide-react";
import React, {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {debounce} from "@/lib/utils";
const SearchTodo = () => {
  const {replace} = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value && value.length > 0) {
        params.set("todoSearch", value);
      } else {
        params.delete("todoSearch");
      }

      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams, pathname, replace]
  );
  return (
    <div className="w-full">
      <div className="relative border border-gray-300 mb-2 md:mb-0">
        <span className="absolute inset-y-0 left-0 flex items-center py-4 bg-background">
          <button type="submit" className="p-2 focus:outline-none focus:ring">
            <Search />
          </button>
        </span>
        <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-background" onChange={(e) => debounce(createQueryString, 1000, e.target.value)} />
      </div>
    </div>
  );
};

export default SearchTodo;
