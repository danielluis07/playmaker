"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const PostSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="w-full h-96" />
      <div className="mt-4 space-y-4 px-3 xl:px-0">
        <Skeleton className="w-full h-10" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-40 h-5" />
      </div>
      <Separator className="my-10 px-3 xl:px-0" />
      <div className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
          <Skeleton className="w-full h-5" />
        </div>
      </div>
    </div>
  );
};
