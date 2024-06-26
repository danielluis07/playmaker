"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import placeholder from "@/public/images/placeholder-logo.jpg";
import { useRouter } from "next/navigation";

export type Items = {
  id: string;
  uid: string;
  guid: string;
  alternateIds: {
    sdr: string;
  };
  firstName: string;
  lastName: string;
  fullName: string;
  displayName: string;
  shortName: string;
  weight: number;
  displayWeight: string;
  height: number;
  displayHeight: string;
  age: number;
  dateOfBirth: string;
  links: Array<{
    language: string;
    rel: string[];
    href: string;
    text: string;
    shortText: string;
    isExternal: boolean;
    isPremium: boolean;
  }>;
  birthPlace: {
    city: string;
    state: string;
    country: string;
  };
  college: {
    id: string;
    mascot: string;
    name: string;
    shortName: string;
    abbrev: string;
    logos: Array<{
      href: string;
      width: number;
      height: number;
      alt: string;
      rel: string[];
      lastUpdated: string;
    }>;
  };
  slug: string;
  jersey: string;
  position: {
    id: string;
    name: string;
    displayName: string;
    abbreviation: string;
    leaf: boolean;
    parent: {
      id: string;
      name: string;
      displayName: string;
      abbreviation: string;
      leaf: boolean;
    };
  };
  injuries: Array<{
    status: string;
    date: string;
  }>;
  contracts: any[];
  experience: {
    years: number;
  };
  status: {
    id: string;
    name: string;
    type: string;
    abbreviation: string;
  };
  headshot: {
    href: string;
    alt: string;
  };
};

export const columns: ColumnDef<Items>[] = [
  {
    accessorKey: "headshot.href",
    header: "Jogador",
    cell: ({ row }) => {
      const router = useRouter();

      if (!row.original.headshot) {
        return (
          <div className="flex items-center space-x-3">
            <div className="relative size-14">
              <Image
                src={placeholder}
                fill
                alt="jogador"
                className="object-cover"
                sizes="56px"
              />
            </div>
            <span>{row.original.fullName}</span>
          </div>
        );
      }
      return (
        <div className="flex items-center space-x-3">
          <div className="relative size-14">
            <Image
              src={
                row.original.headshot.href
                  ? row.original.headshot.href
                  : placeholder
              }
              fill
              alt="jogador"
              className="object-cover"
              sizes="100px"
            />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => router.push(`/nfl/athletes/${row.original.id}`)}>
            <span>{row.original.fullName}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "jersey",
    header: "Número",
  },
  {
    accessorKey: "position.abbreviation",
    header: "Posição",
  },
  {
    accessorKey: "displayHeight",
    header: "Altura (m)",
  },
  {
    accessorKey: "weight",
    header: "Peso (kg)",
  },
  {
    accessorKey: "experience.years",
    header: "Experiência (anos)",
  },
  {
    accessorKey: "college.shortName",
    header: "Universidade",
  },
];
