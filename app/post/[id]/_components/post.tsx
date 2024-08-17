"use client";

import Image from "next/image";
import placeholder from "@/public/images/image-placeholder.jpg";
import Heart from "react-heart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Comments } from "./comments";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";
import { useGetLikes } from "@/queries/get-likes";
import { useCreateLikes } from "@/queries/use-create-like";
import { useRemoveLikes } from "@/queries/use-remove-likes";
import { useSession } from "next-auth/react";
import { useHasUserLiked } from "@/queries/get-user-liked";
import { toast } from "sonner";

type Post = {
  post: {
    id: string;
    title: string;
    shortDescription: string | null;
    description: string;
    imageUrl: string | null;
    content: string;
    isPublished: boolean;
    isFeatured: boolean;
    likes: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
  user: {
    id: string;
    email: string;
    name: string;
    image: string;
    role: string;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
};

type PostProps = {
  data: { data: Post };
};

export const Post = ({ data }: PostProps) => {
  const user = useSession();
  const likesQuery = useGetLikes(data.data.post.id);
  const likesCount: number = likesQuery.data;
  const hasUserLikedQuery = useHasUserLiked(
    data.data.post.id,
    user.data?.user?.id
  );
  const hasUserLiked = hasUserLikedQuery.data;
  const createLikeMutation = useCreateLikes(
    data.data.post.id,
    user.data?.user?.id
  );
  const removeLikeMutation = useRemoveLikes(
    data.data.post.id,
    user.data?.user?.id
  );

  console.log(user, "user");

  useEffect(() => {
    const contentElement = document.querySelector(".post-content");
    if (contentElement) {
      const firstP = contentElement.querySelector("p");
      if (firstP && firstP.textContent) {
        firstP.innerHTML = `<span class="first-character">${firstP.textContent.charAt(
          0
        )}</span>${firstP.textContent.slice(1)}`;
      }
    }
  }, []);

  useEffect(() => {
    if (data) {
      fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/public/posts/${data.data.post.id}/views`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .catch((error) =>
          console.error("Error incrementing view count:", error)
        );
    }
  }, [data]);

  const onClick = () => {
    if (!user.data) {
      toast.error("Você precisa estar logado para curtir o post");
      return;
    }

    if (hasUserLiked) {
      removeLikeMutation.mutate();
    } else {
      createLikeMutation.mutate();
    }
  };

  return (
    <div className="w-full px-3">
      <div className="relative w-full h-96 brightness-50">
        <Image
          src={data.data.post.imageUrl ? data.data.post.imageUrl : placeholder}
          alt={data.data.post.title}
          fill
          sizes="100%"
        />
      </div>
      <div className="mt-4 space-y-4 px-3 xl:px-0">
        <h1 className="text-4xl font-bold py-2">{data.data.post.title}</h1>
        <h4 className="text-xl text-gray-400">{data.data.post.description}</h4>
        <div className="flex items-center text-[12px] space-x-2 text-gray-400">
          <div className="relative size-7 rounded-full overflow-hidden">
            <Image src={data.data.user.image} alt={data.data.user.image} fill />
          </div>
          <span>{data.data.user.name}</span>
          <span>·</span>
          <span>
            {format(new Date(data.data.post.createdAt), "dd/MM/yyyy", {
              locale: ptBR,
            })}
          </span>
        </div>
      </div>
      <Separator className="my-10 px-3 xl:px-0" />
      <div className="flex">
        <div
          className="flex flex-col gap-y-5 post-content"
          dangerouslySetInnerHTML={{ __html: data.data.post.content }}
        />
      </div>

      <Separator className="mt-10 mb-5 px-3 xl:px-0" />

      <div className="flex justify-between items-center px-3 xl:px-2">
        <div className="flex items-center space-x-4 text-gray-500">
          <FacebookShareButton
            url={`${process.env.NEXT_PUBLIC_APP_URL}/post/${data.data.post.id}`}
            title={data.data.post.title}>
            <FaFacebook size={32} />
          </FacebookShareButton>
          <TwitterShareButton
            url={`${process.env.NEXT_PUBLIC_APP_URL}/post/${data.data.post.id}`}
            title={data.data.post.title}>
            <FaXTwitter size={32} />
          </TwitterShareButton>
          <LinkedinShareButton
            url={`${process.env.NEXT_PUBLIC_APP_URL}/post/${data.data.post.id}`}
            title={data.data.post.title}>
            <FaLinkedin size={32} />
          </LinkedinShareButton>
        </div>
        {likesQuery.isLoading ? (
          <Skeleton className="w-14 h-8" />
        ) : (
          <div className="flex items-center space-x-2">
            <div className="w-8">
              <Heart isActive={hasUserLiked} onClick={onClick} />
            </div>
            <span className="ml-2">Likes ({likesCount})</span>
          </div>
        )}
      </div>

      <Separator className="my-10 px-3 xl:px-0" />

      <Comments postId={data.data.post.id} />
    </div>
  );
};
