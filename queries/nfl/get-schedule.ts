import { useQuery } from "@tanstack/react-query";

export const getNflSchedules = (year: number, week: number) => {
  const query = useQuery({
    enabled: !!year && !!week,
    queryKey: ["schedule-nfl", { year, week }],
    queryFn: async () => {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?limit=1000&dates=${year}&seasontype=2&week=${week}`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch nfl schedules`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
