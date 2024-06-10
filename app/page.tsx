import { MainPageCarousel } from "@/components/main-page-carousel";
import { getPosts } from "@/queries/get-posts";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div className="h-full">
      <MainPageCarousel posts={posts} />
    </div>
  );
}
