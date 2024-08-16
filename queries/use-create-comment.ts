import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FormValues } from "@/app/post/[id]/_components/comments";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: FormValues) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/public/comments/create-comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(json),
        }
      );
      return await res.json();
    },
    onSuccess: () => {
      toast.success("Comentário criado!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: () => {
      toast.error("Erro ao criar o comentário!");
    },
  });

  return mutation;
};
