"use client";

import { Skeleton } from "@/components/ui/skeleton";

export const TeamSkeleton = () => {
  return (
    <div className="w-11/12 md:5/6 mx-auto">
      <Skeleton className="w-full h-[250px] sm:h-[300px] md:h-[400px]" />
      <div className="flex md:justify-between mt-14">
        <div className="w-full space-y-4">
          <Skeleton className="w-36 h-5" />
          <Skeleton className="w-36 h-5" />
          <Skeleton className="w-36 h-5" />
          <Skeleton className="w-36 h-5" />
        </div>
        <div className="flex justify-center items-center w-full">
          <Skeleton className="size-[150px]" />
        </div>
      </div>
    </div>
  );
};
