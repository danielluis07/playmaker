import { getNbaTeam } from "@/queries/nba/get-team";
import { Team } from "./_components/team";

const TeamPage = async ({ params }: { params: { id: string } }) => {
  const team = await getNbaTeam(params.id);
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <Team data={team} />
    </div>
  );
};

export default TeamPage;
