import { useQuery } from "@tanstack/react-query";

export const useGetLikes = (postId: string) => {
  const query = useQuery({
    enabled: !!postId,
    queryKey: ["likes", postId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/public/likes/post/${postId}`,
        {
          cache: "no-cache",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch likes from post: ${postId}`);
      }

      const { likes } = await res.json();
      return likes;
    },
  });
  return query;
};
