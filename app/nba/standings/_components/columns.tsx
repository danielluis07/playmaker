"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import placeholder from "@/public/images/placeholder-logo.jpg";
import Link from "next/link";

export type TeamStandings = {
  team: {
    id: string;
    uid: string;
    slug: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    name: string;
    nickname: string;
    location: string;
    color: string;
    alternateColor: string;
    isActive: boolean;
    isAllStar: boolean;
    logos: Array<{
      href: string;
      alt: string;
      rel: string[];
      width: number;
      height: number;
    }>;
    links: Array<{
      language: string;
      rel: string[];
      href: string;
      text: string;
      shortText: string;
      isExternal: boolean;
      isPremium: boolean;
      isHidden: boolean;
    }>;
  };
  records: Array<{
    $ref: string;
    id: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    type: string;
    summary: string;
    displayValue: string;
    value: number;
    stats: Array<{
      name: string;
      displayName: string;
      shortDisplayName: string;
      description: string;
      abbreviation: string;
      type: string;
      value: number;
      displayValue: string;
    }>;
  }>;
};

const findStatByName = (stats: Array<any>, name: string) => {
  return stats.find((stat) => stat.name === name)?.displayValue || "N/A";
};

export const columns: ColumnDef<TeamStandings>[] = [
  {
    accessorFn: (row, index) => index + 1,
    id: "index",
    header: "Posição",
  },
  {
    accessorKey: "headshot.href",
    id: "team",
    header: "Time",
    cell: ({ row }) => {
      if (!row.original.team.logos[0].href) {
        return (
          <div className="flex items-center space-x-3">
            <div className="relative size-10">
              <Image
                src={placeholder}
                fill
                alt="time"
                sizes="(max-width: 480px) 10vw, (max-width: 768px) 5vw, 2.5rem"
              />
            </div>
            <div>
              <span>{row.original.team.displayName}</span>
              {row.original.records[0].stats[4].name === "clincher" ? (
                <span>{row.original.records[0].stats[4].displayValue}</span>
              ) : null}
            </div>
          </div>
        );
      }
      return (
        <div className="flex items-center space-x-3">
          <div className="relative size-10">
            <Image
              src={row.original.team.logos[0].href || placeholder}
              fill
              alt="time"
              sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <Link href={`/nfl/teams/${row.original.team.id}`}>
            <div className="flex items-center relative pr-2 h-10">
              {row.original.team.displayName}
              <span className="absolute right-0 top-0 text-[12px]">
                {row.original.records[0].stats[4].displayValue === "e" ||
                row.original.records[0].stats[4].name !== "clincher"
                  ? null
                  : row.original.records[0].stats[4].displayValue}
              </span>
            </div>
          </Link>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => findStatByName(row.records[0]?.stats || [], "wins"),
    id: "wins",
    header: "V",
  },
  {
    accessorFn: (row) => findStatByName(row.records[0]?.stats || [], "losses"),
    id: "losses",
    header: "D",
  },
  {
    accessorFn: (row) =>
      findStatByName(row.records[0]?.stats || [], "winPercent"),
    id: "winPercent",
    header: "Pct",
  },
  {
    accessorKey: "Home",
    header: "C",
    cell: ({ row }) => {
      return <span>{row.original.records?.[1]?.displayValue || "N/A"}</span>;
    },
  },
  {
    accessorKey: "Away",
    header: "F",
    cell: ({ row }) => {
      return <span>{row.original.records?.[2]?.displayValue || "N/A"}</span>;
    },
  },
  {
    accessorKey: "Division",
    header: "Div",
    cell: ({ row }) => {
      return <span>{row.original.records?.[3]?.displayValue || "N/A"}</span>;
    },
  },
  {
    accessorKey: "Conference",
    header: "Conf",
    cell: ({ row }) => {
      return <span>{row.original.records?.[4]?.displayValue || "N/A"}</span>;
    },
  },
  {
    accessorKey: "LastTen",
    header: "Ult 10",
    cell: ({ row }) => {
      return <span>{row.original.records?.[5]?.displayValue || "N/A"}</span>;
    },
  },
];
