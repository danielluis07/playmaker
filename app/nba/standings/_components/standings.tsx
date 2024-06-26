"use client";

import { getEastOverallStandings } from "@/queries/nba/get-east-standings";
import { getWestOverallStandings } from "@/queries/nba/get-west-standings";
import { nbaTeams } from "@/teams";
import { useMemo, useState } from "react";
import { DataTable } from "./data-table";
import { TeamStandings, columns } from "./columns";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";

export const Standings = () => {
  const yearsNumbers = Array.from(
    { length: 2024 - 2010 + 1 },
    (v, i) => 2010 + i
  ).reverse();
  const [year, setYear] = useState<number>(yearsNumbers[0]);
  const eastStandingsQuery = getEastOverallStandings(year, 2);
  const westStandingsQuery = getWestOverallStandings(year, 2);
  const east: NbaStandings = eastStandingsQuery.data;
  const west: NbaStandings = westStandingsQuery.data;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const findStatValueByName = (stats: Array<any>, name: string): string => {
    return stats.find((stat) => stat.name === name)?.displayValue || "0";
  };

  const updatedEastStandings = useMemo<TeamStandings[]>(() => {
    if (!east) return [];

    return east.standings
      .map((standing) => {
        const $ref = standing.team.$ref;
        const teamIdMatch = $ref.match(/teams\/(\d+)\?/);
        const teamId = teamIdMatch ? teamIdMatch[1] : null;

        if (teamId) {
          const teamObject = nbaTeams.find((team) => team.team.id === teamId);
          if (teamObject) {
            return {
              ...standing,
              team: teamObject.team, // Replace href with the team object
            } as TeamStandings;
          }
        }

        return standing;
      })
      .filter((standing): standing is TeamStandings => standing !== null)
      .sort((a, b) => {
        const clincherStatName = "clincher";
        const winPercentageStatName = "winPercent";

        const aClincher = findStatValueByName(
          a.records[0]?.stats || [],
          clincherStatName
        );
        const bClincher = findStatValueByName(
          b.records[0]?.stats || [],
          clincherStatName
        );
        const aWinPercentage = findStatValueByName(
          a.records[0]?.stats || [],
          winPercentageStatName
        );
        const bWinPercentage = findStatValueByName(
          b.records[0]?.stats || [],
          winPercentageStatName
        );

        const aSpecial = aClincher === "*";
        const bSpecial = bClincher === "*";

        if (aSpecial && !bSpecial) return -1;
        if (!aSpecial && bSpecial) return 1;

        const aValue = parseFloat(aWinPercentage);
        const bValue = parseFloat(bWinPercentage);

        return bValue - aValue;
      });
  }, [east]);

  const updatedWestStandings = useMemo<TeamStandings[]>(() => {
    if (!west) return [];

    return west.standings
      .map((standing) => {
        const $ref = standing.team.$ref;
        const teamIdMatch = $ref.match(/teams\/(\d+)\?/);
        const teamId = teamIdMatch ? teamIdMatch[1] : null;

        if (teamId) {
          const teamObject = nbaTeams.find((team) => team.team.id === teamId);
          if (teamObject) {
            return {
              ...standing,
              team: teamObject.team,
            } as TeamStandings;
          }
        }

        return null;
      })
      .filter((standing): standing is TeamStandings => standing !== null)
      .sort((a, b) => {
        const clincherStatName = "clincher";
        const winPercentageStatName = "winPercent";

        const aClincher = findStatValueByName(
          a.records[0]?.stats || [],
          clincherStatName
        );
        const bClincher = findStatValueByName(
          b.records[0]?.stats || [],
          clincherStatName
        );
        const aWinPercentage = findStatValueByName(
          a.records[0]?.stats || [],
          winPercentageStatName
        );
        const bWinPercentage = findStatValueByName(
          b.records[0]?.stats || [],
          winPercentageStatName
        );

        const aSpecial = aClincher === "*";
        const bSpecial = bClincher === "*";

        if (aSpecial && !bSpecial) return -1;
        if (!aSpecial && bSpecial) return 1;

        const aValue = parseFloat(aWinPercentage);
        const bValue = parseFloat(bWinPercentage);

        return bValue - aValue;
      });
  }, [west]);

  if (eastStandingsQuery.isLoading || westStandingsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <BeatLoader />
      </div>
    );
  }

  return (
    <div className="px-3">
      <h1 className="text-3xl font-bold py-5">Classificação</h1>
      <div className="w-[150px] mt-10">
        <select
          className="w-full h-10 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
          value={year}
          onChange={handleYearChange}>
          {yearsNumbers.map((yearNumber, index) => (
            <option key={index} value={yearNumber.toString()}>
              {yearNumber}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-14">
        <div>
          <h2 className="py-3 font-semibold text-xl">LESTE</h2>
          <DataTable data={updatedEastStandings} columns={columns} />
        </div>
        <Separator className="my-14" />
        <div>
          <h2 className="pb-3 font-semibold text-xl">OESTE</h2>
          <DataTable data={updatedWestStandings} columns={columns} />
        </div>
      </div>
    </div>
  );
};
