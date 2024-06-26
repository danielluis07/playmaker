import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <div className="flex flex-col md:flex-row md:gap-x-2">
        <Skeleton className="w-full h-[500px] md:h-[612px]" />
        <Skeleton className="w-96 h-[612px] border maxlg:hidden" />
      </div>
      <Separator className="my-10" />
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 w-11/12 2xl:w-[99%] mx-auto gap-y-10">
        <Skeleton className="w-[380px] mx-auto h-72" />
        <Skeleton className="w-[380px] mx-auto h-72" />
        <Skeleton className="w-[380px] mx-auto h-72" />
        <Skeleton className="w-[380px] mx-auto h-72" />
        <Skeleton className="w-[380px] mx-auto h-72" />
        <Skeleton className="w-[380px] mx-auto h-72" />
      </div>
    </div>
  );
};

export default Loading;
