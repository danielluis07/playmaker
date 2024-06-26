"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

type TeamsProps = {
  data: Teams;
};

export const Teams = ({ data }: TeamsProps) => {
  const router = useRouter();
  return (
    <div className="w-full">
      <div className="flex items-center justify-center p-10">
        <h1 className="text-3xl font-bold">Times</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-10 w-11/12 gap-10 mx-auto">
        {data.sports[0].leagues[0].teams.map((item, index) => (
          <div
            onClick={() => router.push(`/nfl/teams/${item.team.id}`)}
            className="mx-auto cursor-pointer"
            key={index}>
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
          </div>
        ))}
      </div>
    </div>
  );
};
