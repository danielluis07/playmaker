import { Athlete } from "./_components/athlete";
import { getAthlete } from "@/queries/nfl/get-athlete";

const AthletePage = async ({ params }: { params: { id: string } }) => {
  const athlete = await getAthlete(params.id);
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <Athlete data={athlete} />
    </div>
  );
};

export default AthletePage;
