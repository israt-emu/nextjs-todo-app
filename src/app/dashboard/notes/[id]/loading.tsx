import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const EditNoteLoading = () => {
  return (
    <div className="space-y-2 w-11/12 mx-auto mt-12">
      <Skeleton className="h-52 w-full" />
      <div className="flex items-center gap-1 my-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>

      <Skeleton className="h-12 w-full my-1" />
      <div className="grid grid-cols-1 gap-2 items-center">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full " />
      </div>
    </div>
  );
};

export default EditNoteLoading;
