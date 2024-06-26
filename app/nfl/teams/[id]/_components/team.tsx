"use client";

import Image from "next/image";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getRoster } from "@/queries/nfl/get-roster";
import { useState } from "react";
import { MoonLoader } from "react-spinners";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

type TeamProps = {
  data: Team;
};

const tabs = [
  { tab: "offense", label: "Ataque" },
  { tab: "defense", label: "Defesa" },
  { tab: "specialTeam", label: "Special Team" },
  { tab: "injuredReserveOrOut", label: "Injury Reserve" },
  { tab: "suspended", label: "Suspensos" },
  { tab: "practiceSquad", label: "Practice Squad" },
];

export const Team = ({ data }: TeamProps) => {
  const [activeTab, setActiveTab] = useState<
    | string
    | "offense"
    | "defense"
    | "specialTeam"
    | "injuredReserveOrOut"
    | "suspended"
    | "practiceSquad"
  >("offense");

  const rosterQuery = getRoster(data.team.id);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);
  const rosterData: Roster = rosterQuery.data;
  const isLoading = rosterQuery.isLoading;

  const renderTable = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center">
          <MoonLoader />
        </div>
      );
    }

    switch (activeTab) {
      case "offense":
        return (
          <DataTable
            data={rosterData?.athletes[0].items || []}
            columns={columns}
          />
        );
      case "defense":
        return (
          <DataTable
            data={rosterData?.athletes[1].items || []}
            columns={columns}
          />
        );
      case "specialTeam":
        return (
          <DataTable
            data={rosterData?.athletes[2].items || []}
            columns={columns}
          />
        );
      case "injuredReserveOrOut":
        return (
          <DataTable
            data={rosterData?.athletes[3].items || []}
            columns={columns}
          />
        );
      case "suspended":
        return (
          <DataTable
            data={rosterData?.athletes[4].items || []}
            columns={columns}
          />
        );
      case "practiceSquad":
        return (
          <DataTable
            data={rosterData?.athletes[5].items || []}
            columns={columns}
          />
        );
      default:
        return null;
    }
  };

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
              {data.team.franchise.venue.address?.city}
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
      <div className="mt-14">
        <div className="flex items-center justify-normal gap-x-3 sm:justify-between sm:gap-x-0 px-2 py-3 flex-wrap">
          {tabs.map((item, index) => (
            <div
              className="cursor-pointer"
              key={index}
              onClick={() => setActiveTab(item.tab)}>
              <span
                className={cn(
                  activeTab === item.tab && "border-b-2 border-black",
                  "font-bold text-muted-foreground text-sm"
                )}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
        <div>{renderTable()}</div>
      </div>
    </div>
  );
};
