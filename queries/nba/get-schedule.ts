import { useQuery } from "@tanstack/react-query";

export const getNbaSchedules = (date: string | number | Date) => {
  const query = useQuery({
    enabled: !!date,
    queryKey: ["schedule-nba", { date }],
    queryFn: async () => {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?dates=${date}`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch nba schedules`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
