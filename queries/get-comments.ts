import { useQuery } from "@tanstack/react-query";

const URL = `${process.env.NEXT_PUBLIC_APP_URL}`;

export const useGetComments = (postId: string) => {
  const query = useQuery({
    enabled: !!postId,
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await fetch(`${URL}/api/public/comments/post/${postId}`, {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch post with query: ${postId}`);
      }

      const { data } = await res.json();
      return data;
    },
  });
  return query;
};
