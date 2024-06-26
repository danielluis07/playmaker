import { NbaPostsSkeleton } from "@/components/skeletons/nba-posts-skeleton";

const Loading = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <NbaPostsSkeleton />
    </div>
  );
};

export default Loading;
