"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const AthleteSkeleton = () => {
  return (
    <div className="w-full md:pl-2">
      <div className="flex flex-col md:flex-row">
        <Skeleton className="w-full md:w-96 h-64" />
        <div className="px-5 mt-8 md:mt-0 w-full">
          <Skeleton className="w-48 h-8" />
          <div className="flex flex-col maxsm:gap-y-4 sm:flex-row sm:gap-x-10 lg:gap-x-20 xl:gap-x-28 mt-4">
            <div className="flex flex-col space-y-2">
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="space-y-1">
                <Skeleton className="w-36 h-6" />
                <Skeleton className="w-36 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
