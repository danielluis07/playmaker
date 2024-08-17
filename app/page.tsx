import { FeaturedPosts } from "@/components/featured-posts";
import { Headlines } from "@/components/headlines";
import { MainPageCarousel } from "@/components/main-page-carousel";
import { Separator } from "@/components/ui/separator";
import { getFeaturedPosts } from "@/queries/get-featured-posts";
import { getLatestPosts } from "@/queries/get-latest-posts";

export default async function Home() {
  const [featuredPosts, latestPosts] = await Promise.all([
    getFeaturedPosts(),
    getLatestPosts(),
  ]);

  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <div className="flex flex-col xl:flex-row md:gap-x-2">
        <MainPageCarousel posts={featuredPosts} />
        <Headlines />
      </div>
      <Separator className="my-10" />
      <FeaturedPosts data={latestPosts} />
    </div>
  );
}
