"use client";

import Image from "next/image";
import { getGamesByDate } from "@/queries/nfl/get-games-by-date";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Headlines = () => {
  const date = format(new Date(), "yyyyMMdd");
  const gamesByDateQuery = getGamesByDate(date);
  const data: GamesByDate = gamesByDateQuery.data;
  const router = useRouter();

  console.log(date);

  if (gamesByDateQuery.isLoading)
    return <Skeleton className="w-[390px] h-[612px]" />;

  return (
    <div className="w-full xl:w-[390px] h-56 xl:h-[612px] border pb-2 xl:overflow-auto">
      <div className="p-2 border-b border-border">
        <h2 className="font-bold text-center">Jogos de hoje</h2>
      </div>
      <div className="w-11/12 mx-auto">
        {data.events.length === 0 && (
          <div className="flex justify-center items-center h-1/2">
            <h2 className="text-center text-gray-400">
              Não há jogos marcados para hoje
            </h2>
          </div>
        )}
        <div className="flex flex-row xl:flex-col gap-y-4 gap-x-5 mt-5 overflow-auto">
          {data.events.map((item, index) => (
            <div key={index} className="border border-border">
              <div className="flex items-center justify-between border-b px-3 py-5 maxxl:justify-center">
                <div className="flex items-center justify-between space-x-4 w-56 sm:w-64 md:w-80 lg:w-[460px]">
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
                          {item.competitions[0].competitors[1].team
                            .abbreviation ?? "WSH"}
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
                              src={
                                item.competitions[0].competitors[1].team.logo
                              }
                              alt={
                                item.competitions[0].competitors[1].team.name
                              }
                              fill
                              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <span
                      className={cn(
                        item.competitions[0].competitors[0].score ||
                          item.competitions[0].competitors[1].score === null
                          ? "w-3"
                          : "w-10",
                        "text-lg text-center font-bold"
                      )}>
                      {item.status.type.completed
                        ? item.competitions[0].competitors[1].score
                        : null}
                    </span>
                  </div>

                  <div
                    className={cn(
                      item.competitions[0].competitors[0].score ||
                        item.competitions[0].competitors[1].score === null
                        ? "w-20"
                        : "w-0",
                      "flex justify-center"
                    )}>
                    <span className="text-xl">@</span>
                  </div>

                  <div className="flex items-center w-full">
                    <span
                      className={cn(
                        item.competitions[0].competitors[0].score ||
                          item.competitions[0].competitors[1].score === null
                          ? "w-3"
                          : "w-10",
                        "text-lg text-center font-bold"
                      )}>
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
                          {item.competitions[0].competitors[0].team
                            .abbreviation ?? "WSH"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center h-7">
                <div className="space-x-2">
                  <span className="font-semibold text-[12px] text-gray-500">
                    {format(item.date, "HH:mm")}
                  </span>
                  <span>|</span>
                  <span className="font-semibold text-[12px] text-gray-500 truncate">
                    {item.competitions[0].venue.fullName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
