"use client";

import Image from "next/image";
import { getGamesByDate } from "@/queries/nfl/get-games-by-date";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";

export const Headlines = () => {
  const date = format(new Date(), "yyyyMMdd");
  const gamesByDateQuery = getGamesByDate(date);
  const data: GamesByDate = gamesByDateQuery.data;
  const router = useRouter();

  if (gamesByDateQuery.isLoading)
    return <div className="w-[350px] h-[612px]">loading...</div>;

  return (
    <div className="w-[350px] h-[612px] border maxlg:hidden">
      <div className="p-2">
        <h2 className="font-bold text-center">Jogos de hoje</h2>
      </div>
      <div className="space-y-4 mt-10">
        {data.events.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border px-3 py-5">
            <div>
              <span className="font-bold text-sm">
                {format(item.date, "HH:mm")}
              </span>
            </div>

            <div className="flex items-center justify-between space-x-5 w-56 sm:w-64 md:w-80 lg:w-[460px]">
              <div className="flex justify-end items-center w-full">
                <div className="flex flex-col lg:flex-row items-center">
                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/nfl/teams/${item.competitions[0].competitors[1].team.id}`
                      )
                    }>
                    <span className="lg:hidden order-last">
                      {item.competitions[0].competitors[1].team.abbreviation ??
                        "WSH"}
                    </span>
                  </div>
                  <div className="maxlg:order-first">
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/nfl/teams/${item.competitions[0].competitors[1].team.id}`
                        )
                      }>
                      <div className="relative size-8 cursor-pointer">
                        <Image
                          src={item.competitions[0].competitors[1].team.logo}
                          alt={item.competitions[0].competitors[1].team.name}
                          fill
                          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="w-5 text-lg text-center font-bold">
                  {item.status.type.completed
                    ? item.competitions[0].competitors[1].score
                    : null}
                </span>
              </div>

              <div className="flex justify-center w-20">
                <span className="text-xl">@</span>
              </div>

              <div className="flex items-center w-full">
                <span className="w-5 text-lg text-center font-bold">
                  {item.status.type.completed
                    ? item.competitions[0].competitors[0].score
                    : null}
                </span>
                <div className="flex flex-col lg:flex-row items-center">
                  <div
                    onClick={() =>
                      router.push(
                        `/nfl/teams/${item.competitions[0].competitors[0].team.id}`
                      )
                    }
                    className="relative size-8 cursor-pointer">
                    <Image
                      src={item.competitions[0].competitors[0].team.logo}
                      alt={item.competitions[0].competitors[0].team.name}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() =>
                      router.push(
                        `/nfl/teams/${item.competitions[0].competitors[0].team.id}`
                      )
                    }>
                    <span className="lg:hidden">
                      {item.competitions[0].competitors[0].team.abbreviation ??
                        "WSH"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <FaPlus />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
