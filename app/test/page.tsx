import { AthleteSkeleton } from "@/components/skeletons/athlete-skeleton";
import { NbaPostsSkeleton } from "@/components/skeletons/nba-posts-skeleton";
import { PostSkeleton } from "@/components/skeletons/post-skeleton";
import { TeamSkeleton } from "@/components/skeletons/team-skeleton";

const TestPage = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <NbaPostsSkeleton />
    </div>
  );
};

export default TestPage;
