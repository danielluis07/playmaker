import { useQuery } from "@tanstack/react-query";

export const getRoster = (number: string) => {
  const query = useQuery({
    enabled: !!number,
    queryKey: ["roster-nfl", { number }],
    queryFn: async () => {
      const res = await fetch(
        `https://site.api.espn.com/apis/site/v2/sports/football/nfl/teams/${number}/roster`,
        { cache: "no-cache" }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch roster with number: ${number}`);
      }

      const data = await res.json();
      return data;
    },
  });
  return query;
};
