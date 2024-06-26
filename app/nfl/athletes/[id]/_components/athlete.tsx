"use client";

import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import placeholder from "@/public/images/placeholder-logo.jpg";

type AthleteProps = {
  data: Athlete;
};

const convertLbToKg = (lb: number) => Math.round(lb * 0.453592);

const convertHeightToMeters = (height: string) => {
  const [feet, inches] = height.split(/['"]/).map((value) => parseInt(value));
  const totalInches = feet * 12 + inches;
  const meters = (totalInches * 0.0254).toFixed(2);
  return `${meters}`;
};

export const Athlete = ({ data }: AthleteProps) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        {!data.headshot ? (
          <div className="relative w-96 h-56 maxmd:mx-auto">
            <Image src={placeholder} alt="player" fill />
          </div>
        ) : (
          <div className="relative w-96 h-56 maxmd:mx-auto">
            <Image src={data.headshot.href} alt={data.headshot.alt} fill />
          </div>
        )}
        <div className="px-5 mt-8 md:mt-0 w-full">
          <span className="text-3xl font-bold">{data.displayName}</span>
          <div className="flex flex-col maxsm:gap-y-4 sm:flex-row sm:gap-x-10 lg:gap-x-20 xl:gap-x-28 mt-4">
            <div className="flex flex-col space-y-2">
              {data.dateOfBirth && (
                <div>
                  <h3 className="font-bold">Nascimento</h3>
                  <span className="text-sm">
                    {format(new Date(data.dateOfBirth), "dd/MM/yyyy", {
                      locale: ptBR,
                    })}
                  </span>
                </div>
              )}
              {data.age && (
                <div>
                  <h3 className="font-bold">Idade</h3>
                  <span className="text-sm">{data.age} anos</span>
                </div>
              )}
              <div>
                <h3 className="font-bold">Local de Nascimento</h3>
                <span className="text-sm">
                  {data.birthPlace.city}, {data.birthPlace.state},{" "}
                  {data.birthPlace.country}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div>
                <h3 className="font-bold">Posição</h3>
                <span className="text-sm">{data.position.displayName}</span>
              </div>
              <div>
                <h3 className="font-bold">Peso (kg)</h3>
                <span className="text-sm">{convertLbToKg(data.weight)}</span>
              </div>
              <div>
                <h3 className="font-bold">Altura (m)</h3>
                <span className="text-sm">
                  {convertHeightToMeters(data.displayHeight)}
                </span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              {data.draft && (
                <div>
                  <h3 className="font-bold">Draft</h3>
                  <h4 className="text-sm">
                    {data.draft.year} / Rodada: {data.draft.round} / Escolha:{" "}
                    {data.draft.selection}
                  </h4>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
