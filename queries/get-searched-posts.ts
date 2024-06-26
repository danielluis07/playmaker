import { useQuery } from "@tanstack/react-query";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}/api/public/posts`;

export const getSearchedPosts = (q: string | string[] | undefined) => {
  const query = useQuery({
    enabled: !!q,
    queryKey: ["searched-posts", { q }],
    queryFn: async () => {
      const res = await fetch(`${URL}/search?q=${q}`, { cache: "no-cache" });

      if (!res.ok) {
        throw new Error(`Failed to fetch post with query: ${q}`);
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
