import { NflPosts } from "./_components/nfl-posts";
import { getNflPosts } from "@/queries/nfl/get-nfl-posts";

const NflPage = async () => {
  const data = await getNflPosts();
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <NflPosts data={data} />
    </div>
  );
};

export default NflPage;
