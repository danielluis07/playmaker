import { useQuery } from "@tanstack/react-query";

export const getEastOverallStandings = (year: number, type: number) => {
  const query = useQuery({
    enabled: !!year && !!type,
    queryKey: ["overall-standings-east", { year, type }],
    queryFn: async () => {
      const res = await fetch(
        `https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/${year}/types/${2}/groups/5/standings/0?lang=en&region=us`,
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
