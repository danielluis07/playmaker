"use client";

import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export const NbaPostsSkeleton = () => {
  return (
    <div className="w-full px-3">
      <Skeleton className="w-56 h-10" />
      <Separator className="my-10 w-full" />
      <div className="space-y-8">
        <div className="flex items-center md:items-stretch">
          <Skeleton className="h-32 min-w-32 md:min-w-60 md:h-48 order-last md:order-first" />
          <div className="pr-2 w-full md:pl-3 space-y-2 order-first md:order-last">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
        <div className="flex items-center md:items-stretch">
          <Skeleton className="h-32 min-w-32 md:min-w-60 md:h-48 order-last md:order-first" />
          <div className="pr-2 w-full md:pl-3 space-y-2 order-first md:order-last">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
        <div className="flex items-center md:items-stretch">
          <Skeleton className="h-32 min-w-32 md:min-w-60 md:h-48 order-last md:order-first" />
          <div className="pr-2 w-full md:pl-3 space-y-2 order-first md:order-last">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
        <div className="flex items-center md:items-stretch">
          <Skeleton className="h-32 min-w-32 md:min-w-60 md:h-48 order-last md:order-first" />
          <div className="pr-2 w-full md:pl-3 space-y-2 order-first md:order-last">
            <Skeleton className="w-28 h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-full h-5" />
            <Skeleton className="w-32 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
