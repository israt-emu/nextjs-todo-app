import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const TodoLoading = () => {
  return (
    <div className="space-y-2 w-10/12 mx-auto mt-12">
      <div className="flex justify-between gap-3 items-center">
        <div className="flex items-center gap-1">
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-2 w-4" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-2 w-4" />
          <Skeleton className="h-2 w-4" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <Skeleton className="h-8" />
        <div className="flex items-center gap-1 justify-center md:justify-end">
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-6 w-6 rounded-md" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
      <Skeleton className="h-12 w-full" />
    </div>
  );
};

export default TodoLoading;
