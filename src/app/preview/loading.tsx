import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const ShareNoteLoading = () => {
  return (
    <div className="space-y-2 w-11/12 sm:w-9/12 mx-auto mt-6">
      <Skeleton className="h-52 w-full" />
      <Skeleton className="h-12 w-full my-1" />
      <div className="grid grid-cols-1 gap-2 items-center">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full " />
      </div>
    </div>
  );
};

export default ShareNoteLoading;
