import { AthleteSkeleton } from "@/components/skeletons/athlete-skeleton";

const Loading = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <AthleteSkeleton />
    </div>
  );
};

export default Loading;
