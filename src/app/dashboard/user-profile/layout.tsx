import {Skeleton} from "@/components/ui/skeleton";
import React from "react";

const ProfileLayout = () => {
  return (
    <div className="grid w-11/12 lg:w-10/12 gap-4 mt-6 sm:mt-0 mx-auto lg:grid-cols-3 lg:gap-6 xl:gap-10 pb-5">
      <div className="space-y-4 lg:col-span-3">
        <div className="flex items-center space-x-4">
          <Skeleton className=" w-24 h-24 rounded-full" />

          <div className="space-y-1 w-full">
            <Skeleton className="h-7 w-6/12" />
            <Skeleton className="h-6 w-7/12" />
          </div>
        </div>
        <Skeleton className="h-5 w-9/12" />
      </div>
      <div className="space-y-3 lg:col-span-2">
        <div className="">
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              <div>
                <Skeleton className="h-10" />
              </div>
              <div>
                <Skeleton className="h-10" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-10" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-30" />
            </div>
            <div>
              <Skeleton className="h-9 w-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
