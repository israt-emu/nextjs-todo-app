"use client";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {RotateCcw} from "lucide-react";
import {useRouter, useSearchParams} from "next/navigation";
import React, {useCallback} from "react";

const ResetFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const resetSearchParams = useCallback(() => {
    const pathname = window.location.pathname;
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      params.delete(key);
    });
    // If there are remaining parameters, include them in the URL
    // const newSearchParams = params.toString();

    router.push(pathname);
  }, [router, searchParams]);
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="w-6 h-6 rounded-full bg-secondary flex justify-center items-center text-gray-200" onClick={resetSearchParams}>
              <RotateCcw className="w-5" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ResetFilter;
