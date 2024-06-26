"use client";

import { getNflSchedules } from "@/queries/nfl/get-schedule";
import { format } from "date-fns";
import { FaPlus } from "react-icons/fa6";
import Image from "next/image";
import { useState } from "react";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/navigation";

export const Schedule = () => {
  const yearsNumbers = Array.from(
    { length: 2024 - 2010 + 1 },
    (v, i) => 2010 + i
  ).reverse();
  const weekNumbers = Array.from({ length: 18 }, (v, i) => i + 1);
  const [year, setYear] = useState<string>(yearsNumbers[0].toString());
  const [week, setWeek] = useState<string>(weekNumbers[0].toString());
  const scheduleQuery = getNflSchedules(Number(year), Number(week));
  const data: Schedule = scheduleQuery.data;
  const router = useRouter();

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const handleWeekChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWeek(e.target.value);
  };

  if (scheduleQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <PulseLoader />
      </div>
    );
  }

  if (scheduleQuery.error) {
    return (
      <div className="flex justify-center items-center mt-14 h-[300px]">
        <h1 className="text-2xl text-gray-400">
          Houve um erro inesperado. Tente recarregar a página
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full px-3 xl:px-0">
      <div className="space-y-5 pb-8 border-b">
        <h1 className="text-3xl">Calendário</h1>
        <div className="flex items-center space-x-4">
          <div className="w-[150px]">
            <select
              className="w-full h-8 border rounded-sm"
              value={year}
              onChange={handleYearChange}>
              {yearsNumbers.map((yearNumber, index) => (
                <option key={index} value={yearNumber.toString()}>
                  {yearNumber}
                </option>
              ))}
            </select>
          </div>
          <span>-</span>
          <div className="w-[150px]">
            <select
              className="w-full h-8 border rounded-sm"
              value={week}
              onChange={handleWeekChange}>
              {weekNumbers.map((weekNumber) => (
                <option key={weekNumber} value={weekNumber.toString()}>
                  Semana {weekNumber}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="space-y-4 mt-14">
        {data.events.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border px-3 py-5">
            <div>
              <span>{format(item.date, "HH:mm")}</span>
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
                    <span className="maxlg:hidden pr-4">
                      {item.competitions[0].competitors[0].team.name ??
                        "Commanders"}
                    </span>
                  </div>
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
                {item.competitions[0].competitors[0].score === "0" &&
                year === "2024" ? null : (
                  <span className="w-10 text-xl text-center font-bold">
                    {item.competitions[0].competitors[1].score}
                  </span>
                )}
              </div>

              <div className="flex justify-center w-20">
                <span className="text-2xl">@</span>
              </div>

              <div className="flex items-center w-full">
                {item.competitions[0].competitors[0].score == "0" &&
                year === "2024" ? null : (
                  <span className="w-10 text-xl text-center font-bold">
                    {item.competitions[0].competitors[0].score}
                  </span>
                )}
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
                    <span className="maxlg:hidden pl-4">
                      {item.competitions[0].competitors[0].team.name ??
                        "Commanders"}
                    </span>
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
