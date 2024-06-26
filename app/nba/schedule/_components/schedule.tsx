"use client";

import { Calendar } from "@/components/ui/calendar";
import { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import { getNbaSchedules } from "@/queries/nba/get-schedule";
import { FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PulseLoader } from "react-spinners";
import { ptBR } from "date-fns/locale/pt-BR";
import { Separator } from "@/components/ui/separator";
import { ChevronDownIcon } from "@radix-ui/react-icons";

export const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);
  const nbaScheduleQuery = getNbaSchedules(
    format(date as string | number | Date, "yyyyMMdd")
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const data: NbaSchedule = nbaScheduleQuery.data;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calendarRef]);

  if (nbaScheduleQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[300px]">
        <PulseLoader />
      </div>
    );
  }

  if (nbaScheduleQuery.error) {
    return (
      <div className="flex justify-center items-center mt-14 h-[300px]">
        <h1 className="text-2xl text-gray-400">
          Houve um erro inesperado. Tente recarregar a página
        </h1>
      </div>
    );
  }

  console.log(nbaScheduleQuery.data);

  return (
    <div className="w-full px-3 xl:px-0">
      <h1 className="text-3xl">Calendário</h1>
      <div className="relative border rounded-md cursor-pointer mt-5 h-10 w-[250px]">
        <div
          className="flex items-center pl-2 h-full"
          onClick={() => setIsOpen(!isOpen)}>
          Escolha uma data
        </div>
        <ChevronDownIcon className="absolute top-3 right-2" />
        {isOpen && (
          <div ref={calendarRef}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="absolute rounded-md border w-min top-10 left-0 bg-white"
            />
          </div>
        )}
      </div>
      <h2 className="mt-10 text-lg">
        {format(date as string | number | Date, "dd 'de' MMMM, yyyy", {
          locale: ptBR,
        })}
      </h2>
      <Separator className="w-full my-10" />
      {data.events.length < 1 ? (
        <div className="flex items-center justify-center h-[300px]">
          <p className="text-xl text-gray-500">
            Não há jogos selecionados para essa data
          </p>
        </div>
      ) : (
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
                          `/nba/teams/${item.competitions[0].competitors[0].id}`
                        )
                      }>
                      <span className="maxlg:hidden pr-4">
                        {
                          item.competitions[0].competitors[0].team
                            .shortDisplayName
                        }
                      </span>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/nba/teams/${item.competitions[0].competitors[0].team.id}`
                        )
                      }>
                      <span className="lg:hidden order-last">
                        {item.competitions[0].competitors[0].team.abbreviation}
                      </span>
                    </div>
                    <div className="maxlg:order-first">
                      <div
                        className="cursor-pointer"
                        onClick={() =>
                          router.push(
                            `/nba/teams/${item.competitions[0].competitors[0].team.id}`
                          )
                        }>
                        <div className="relative size-8 cursor-pointer">
                          <Image
                            src={item.competitions[0].competitors[0].team.logo}
                            alt={item.competitions[0].competitors[0].team.name}
                            fill
                            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <span className="w-10 text-xl text-center font-bold">
                    {item.competitions[0].competitors[0].score}
                  </span>
                </div>

                <div className="flex justify-center w-20">
                  <span className="text-2xl">@</span>
                </div>

                <div className="flex items-center w-full">
                  <span className="w-10 text-xl text-center font-bold">
                    {item.competitions[0].competitors[1].score}
                  </span>
                  <div className="flex flex-col lg:flex-row items-center">
                    <div
                      onClick={() =>
                        router.push(
                          `/nba/teams/${item.competitions[0].competitors[1].team.id}`
                        )
                      }
                      className="relative size-8 cursor-pointer">
                      <Image
                        src={item.competitions[0].competitors[1].team.logo}
                        alt={item.competitions[0].competitors[1].team.name}
                        fill
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/nba/teams/${item.competitions[0].competitors[1].team.id}`
                        )
                      }>
                      <span className="maxlg:hidden pl-4">
                        {
                          item.competitions[0].competitors[1].team
                            .shortDisplayName
                        }
                      </span>
                    </div>
                    <div
                      className="cursor-pointer"
                      onClick={() =>
                        router.push(
                          `/nba/teams/${item.competitions[0].competitors[1].team.id}`
                        )
                      }>
                      <span className="lg:hidden">
                        {item.competitions[0].competitors[1].team.abbreviation}
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
      )}
    </div>
  );
};
