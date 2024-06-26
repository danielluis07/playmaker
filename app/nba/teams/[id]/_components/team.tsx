"use client";

import Image from "next/image";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { Skeleton } from "@/components/ui/skeleton";
import { getNbaRoster } from "@/queries/nba/get-roster";

type TeamProps = {
  data: Team;
};

export const Team = ({ data }: TeamProps) => {
  const rosterQuery = getNbaRoster(data.team.id);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const rosterData: NbaRoster = rosterQuery.data;
  const isLoading = rosterQuery.isLoading;

  return (
    <div className="w-11/12 md:5/6 mx-auto">
      <div className="relative w-full h-[250px] sm:h-[300px] md:h-[400px]">
        {isImageLoading && <Skeleton className="size-full" />}
        <Image
          src={data.team.franchise.venue.images[0].href}
          alt={data.team.franchise.venue.images[0].alt}
          fill
          priority
          onLoad={() => setIsImageLoading(false)}
          sizes="(max-width: 600px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
      <div className="flex md:justify-between mt-14">
        <div className="w-full space-y-4">
          <h1 className="text-xl md:text-3xl font-bold">
            {data.team.displayName}
          </h1>
          <h2 className="maxmd:text-sm font-bold">
            Cidade:{" "}
            <span className="font-normal">
              {data.team.franchise.venue.address?.city || "Detroit, Michigan"}
            </span>
            ,{" "}
            <span className="font-normal">
              {data.team.franchise.venue.address?.state}
            </span>
          </h2>
          <h2 className="maxmd:text-sm font-bold">
            Estádio:{" "}
            <span className="font-normal">
              {data.team.franchise.venue.fullName}
            </span>
          </h2>
          <h2 className="maxmd:text-sm">{data.team.standingSummary}</h2>
        </div>
        <div className="flex justify-center items-center w-full">
          <Image
            src={data.team.logos[0].href}
            alt={data.team.abbreviation}
            width={150}
            height={150}
          />
        </div>
      </div>
      {isLoading ? (
        <div className="flex justify-center">
          <MoonLoader />
        </div>
      ) : (
        <div className="mt-14">
          <DataTable data={rosterData?.athletes || []} columns={columns} />
        </div>
      )}
    </div>
  );
};
