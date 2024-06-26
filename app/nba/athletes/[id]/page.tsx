import { Athlete } from "./_components/athlete";
import { getNbaAthlete } from "@/queries/nba/get-athlete";

const AthletePage = async ({ params }: { params: { id: string } }) => {
  const athlete = await getNbaAthlete(params.id);
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <Athlete data={athlete} />
    </div>
  );
};

export default AthletePage;
