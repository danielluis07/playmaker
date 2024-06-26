"use client";

import { getAfcOverallStandings } from "@/queries/nfl/get-afc-standings";
import { teams } from "@/teams";
import { useMemo, useState } from "react";
import { DataTable } from "./data-table";
import { TeamStandings, columns } from "./columns";
import { getNfcOverallStandings } from "@/queries/nfl/get-nfc-standings";
import { Separator } from "@/components/ui/separator";
import { BeatLoader } from "react-spinners";

export const Standings = () => {
  const yearsNumbers = Array.from(
    { length: 2023 - 2010 + 1 },
    (v, i) => 2010 + i
  ).reverse();
  const [year, setYear] = useState<number>(yearsNumbers[0]);
  const afcStandingsQuery = getAfcOverallStandings(year, 2);
  const nfcStandingsQuery = getNfcOverallStandings(year, 2);
  const afcData: Standings = afcStandingsQuery.data;
  const nfcData: Standings = nfcStandingsQuery.data;

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(Number(e.target.value));
  };

  const findStatValueByName = (stats: Array<any>, name: string): string => {
    return stats.find((stat) => stat.name === name)?.displayValue || "0";
  };

  const updatedAfcStandings = useMemo<TeamStandings[]>(() => {
    if (!afcData) return [];

    return afcData.standings
      .map((standing) => {
        const $ref = standing.team.$ref;
        const teamIdMatch = $ref.match(/teams\/(\d+)\?/);
        const teamId = teamIdMatch ? teamIdMatch[1] : null;

        if (teamId) {
          const teamObject = teams.find((team) => team.team.id === teamId);
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
  }, [afcData]);

  const updatedNfcStandings = useMemo<TeamStandings[]>(() => {
    if (!nfcData) return [];

    return nfcData.standings
      .map((standing) => {
        const $ref = standing.team.$ref;
        const teamIdMatch = $ref.match(/teams\/(\d+)\?/);
        const teamId = teamIdMatch ? teamIdMatch[1] : null;

        if (teamId) {
          const teamObject = teams.find((team) => team.team.id === teamId);
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
  }, [nfcData]);

  if (afcStandingsQuery.isLoading || nfcStandingsQuery.isLoading) {
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
          <h2 className="py-3 font-semibold text-xl">AFC</h2>
          <DataTable data={updatedAfcStandings} columns={columns} />
        </div>
        <Separator className="my-14" />
        <div>
          <h2 className="pb-3 font-semibold text-xl">NFC</h2>
          <DataTable data={updatedNfcStandings} columns={columns} />
        </div>
      </div>
    </div>
  );
};
