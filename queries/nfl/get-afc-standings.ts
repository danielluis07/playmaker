import { useQuery } from "@tanstack/react-query";

export const getAfcOverallStandings = (year: number, type: number) => {
  const query = useQuery({
    enabled: !!year && !!type,
    queryKey: ["overall-standings-afc", { year, type }],
    queryFn: async () => {
      const res = await fetch(
        `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/seasons/${year}/types/${type}/groups/8/standings/0?lang=en&region=us`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch nfl standings`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
