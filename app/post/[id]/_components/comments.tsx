"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import placeholder from "@/public/images/image-placeholder.jpg";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { useCreateComment } from "@/queries/use-create-comment";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormDescription,
} from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGetComments } from "@/queries/get-comments";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

type CommentsProps = {
  postId: string;
};

const commentSchema = z.object({
  text: z.string(),
  postId: z.string(),
  authorId: z.string(),
});

export type FormValues = z.infer<typeof commentSchema>;

export const Comments = ({ postId }: CommentsProps) => {
  const { data } = useSession();
  const commentsQuery = useGetComments(postId);
  const comments: PostComment[] = commentsQuery.data ?? [];
  const form = useForm<FormValues>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      text: "",
      postId: "",
      authorId: "",
    },
  });

  const mutation = useCreateComment();

  const onSubmit = (values: FormValues) => {
    if (!data?.user?.id) {
      toast.error("Você precisa estar logado para comentar");
      return;
    }
    mutation.mutate({ ...values, postId, authorId: data?.user.id });
    form.reset();
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <div className="mt-10 px-3 w-full">
      <h3 className="text-2xl font-bold mb-6">Comentários</h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onInvalid)}
          className="mb-6">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <Textarea
                className="w-full p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Escreva seu comentário..."
                rows={4}
                {...field}
              />
            )}
          />
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="mt-3 px-6 py-2 bg-black text-white hover:bg-black/50">
            Postar comentário
          </Button>
        </form>
      </Form>

      {comments.length < 1 && (
        <div>
          <Separator className="my-10 w-full" />
          <p className="text-gray-400 text-center text-xl">
            Sem comentários ainda :(
          </p>
        </div>
      )}

      {commentsQuery.isLoading ? (
        <Skeleton className="w-full h-14" />
      ) : (
        <div className="space-y-6">
          {comments.map((item, index) => (
            <div
              key={index}
              className="flex space-x-4 border-t border-border p-5">
              <div className="relative size-12 rounded-full overflow-hidden">
                <Image
                  src={item.imageUrl || placeholder}
                  alt="user"
                  fill
                  sizes="(max-width: 480px) 10vw, (max-width: 768px) 6vw, 3rem"
                />
              </div>
              <div>
                <h4 className="text-lg font-semibold">{item.name}</h4>
                <span className="text-sm text-gray-400">
                  {format(item.createdAt, "d 'de' MMMM 'de' yyyy 'às' HH:mm", {
                    locale: ptBR,
                  })}
                </span>
                <p className="mt-2">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
