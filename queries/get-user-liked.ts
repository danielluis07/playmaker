import { useQuery } from "@tanstack/react-query";

export const useHasUserLiked = (postId: string, userId: string | undefined) => {
  const query = useQuery({
    enabled: !!postId,
    queryKey: ["has-likes", postId],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/public/likes/post/${postId}/user/${userId}`,
        {
          cache: "no-cache",
        }
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch boolean from post: ${postId}`);
      }

      const { liked } = await res.json();
      return liked;
    },
  });
  return query;
};
