import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const NoteLoading = () => {
  return (
    <div className="space-y-2 sm:w-11/12 lg:w-full mx-auto mt-14">
      <div className="flex items-center gap-1">
        <Skeleton className="h-2 w-4" />
        <Skeleton className="h-2 w-4" />
        <Skeleton className="h-2 w-4" />
      </div>
      <Skeleton className="h-1 w-full my-1" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 items-center">
        <Skeleton className="h-40 md:w-[240px] lg:w-[320px] " />
        <Skeleton className="h-40 md:w-[240px] lg:w-[320px] " />
        <Skeleton className="h-40 md:w-[240px] lg:w-[320px] " />
        <Skeleton className="h-40 md:w-[240px] lg:w-[320px] " />
      </div>
    </div>
  );
};

export default NoteLoading;
