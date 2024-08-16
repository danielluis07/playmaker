import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateLikes = (postId: string, userId: string | undefined) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/public/likes/post/create-like`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ postId, userId }),
        }
      );
      return await res.json();
    },
    onMutate: async () => {
      const previousLikes = queryClient.getQueryData(["likes", postId]); // count
      const previousHasLikes = queryClient.getQueryData(["has-likes", postId]); // boolean

      queryClient.setQueryData(["likes", postId], (old) => {
        // Check if 'old' is a valid number, otherwise initialize it to 0
        const currentLikes = typeof old === "number" ? old : 0;
        return currentLikes + 1;
      });
      queryClient.setQueryData(["has-likes", postId], (old: any) => {
        if (!old) return true;
        return true;
      });

      return { previousLikes, previousHasLikes };
    },
    onSuccess: () => {
      toast.success("Obrigado pelo seu like!");
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["likes", postId], context?.previousLikes);
      queryClient.setQueryData(
        ["has-likes", postId],
        context?.previousHasLikes
      );
      toast.error("Erro ao processar o like!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
      queryClient.invalidateQueries({ queryKey: ["has-likes", postId] });
    },
  });

  return mutation;
};
