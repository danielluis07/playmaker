import { useQuery } from "@tanstack/react-query";

export const getNbaRoster = (number: string) => {
  const query = useQuery({
    enabled: !!number,
    queryKey: ["roster-nba", { number }],
    queryFn: async () => {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${number}/roster`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch nba roster with number: ${number}`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
