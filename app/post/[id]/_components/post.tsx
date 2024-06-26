"use client";

import Image from "next/image";
import placeholder from "@/public/images/image-placeholder.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Separator } from "@/components/ui/separator";
import { useEffect } from "react";

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

  return (
    <div className="w-full">
      <div className="relative w-full h-96 brightness-50">
        <Image
          src={data.data.post.imageUrl ? data.data.post.imageUrl : placeholder}
          alt={data.data.post.title}
          fill
          className="object-cover"
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
          className="flex flex-col xl:w-5/6 xl:mx-auto gap-y-5 px-3 xl:pr-2 post-content"
          dangerouslySetInnerHTML={{ __html: data.data.post.content }}
        />
      </div>
    </div>
  );
};
