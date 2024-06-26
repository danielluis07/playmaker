import { PostSkeleton } from "@/components/skeletons/post-skeleton";

const Loading = () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <PostSkeleton />
    </div>
  );
};

export default Loading;
