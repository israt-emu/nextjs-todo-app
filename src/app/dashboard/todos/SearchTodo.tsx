import {Search} from "lucide-react";
import React, {useCallback} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
const SearchTodo = () => {
  const {replace} = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("todoSearch", value);
      replace(`${pathname}?${params.toString()}`);
    },
    [searchParams]
  );
  return (
    <div>
      <div className="relative border border-gray-300 w-2/4">
        <span className="absolute inset-y-0 left-0 flex items-center py-4 bg-background">
          <button type="submit" className="p-2 focus:outline-none focus:ring">
            <Search />
          </button>
        </span>
        <input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm rounded-md focus:outline-none bg-background" />
      </div>
    </div>
  );
};

export default SearchTodo;
