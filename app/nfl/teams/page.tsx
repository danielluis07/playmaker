import Image from "next/image";
import { teams } from "@/teams";
import Link from "next/link";

const TeamsPage = async () => {
  return (
    <div className="max-w-[1200px] mx-auto mt-24 lg:mt-36">
      <div className="w-full">
        <div className="flex items-center justify-center p-10">
          <h1 className="text-3xl font-bold">Times</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 w-11/12 gap-10 mx-auto">
          {teams.map((item, index) => (
            <div className="mx-auto cursor-pointer" key={index}>
              <Link href={`/nfl/teams/${item.team.id}`}>
                <div className="relative w-24 h-20 mx-auto">
                  <Image
                    src={item.team.logos[0].href}
                    alt={item.team.logos[0].alt}
                    fill
                    sizes="500px"
                  />
                </div>
                <div className="flex justify-center">
                  <span>{item.team.displayName}</span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamsPage;
