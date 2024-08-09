import { useQuery } from "@tanstack/react-query";

export const getGamesByDate = (date: string) => {
  const query = useQuery({
    enabled: !!date,
    queryKey: ["games-by-date-nfl", { date }],
    queryFn: async () => {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?dates=${date}`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch games with date : ${date}`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
