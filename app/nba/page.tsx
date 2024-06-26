import { getNbaPosts } from "@/queries/nba/get-nba-posts";
import { NbaPosts } from "./_components/nba-posts";

const NbaPage = async () => {
  const data = await getNbaPosts();
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <NbaPosts data={data} />
    </div>
  );
};

export default NbaPage;
