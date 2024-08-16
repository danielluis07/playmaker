"use client";

import placeholder from "@/public/images/image-placeholder.jpg";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";

type Post = {
  data: Array<{
    post: {
      id: string;
      title: string;
      shortDescription: string | null;
      description: string;
      imageUrl: string | null;
      content: string;
      isPublished: boolean;
      isFeatured: boolean;
      league: string;
      postType: string;
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
  }>;
};

type FeaturedPostsProps = {
  data: Post;
};

export const FeaturedPosts = ({ data }: FeaturedPostsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full gap-y-10">
      {data.data.map((item, index) => (
        <div key={index} className="w-[375px] mx-auto">
          <div className="relative w-full h-72">
            <Image
              src={item.post.imageUrl ? item.post.imageUrl : placeholder}
              alt={item.post.title}
              fill
              sizes="100vw"
            />
          </div>
          <div className="mt-2 flex flex-col h-[200px] justify-between">
            <span className="text-white text-[10px] rounded-md bg-black p-1 w-min">
              {item.post.postType}
            </span>
            <div className="mt-2">
              <Link href={`/post/${item.post.id}`}>
                <h2 className="text-xl font-bold hover:underline line-clamp-2">
                  {item.post.title}
                </h2>
              </Link>
            </div>
            <div className="flex items-center text-[12px] space-x-2 mt-2">
              <span>{item.user.name}</span>
              <span>·</span>
              <span>
                {format(new Date(item.post.createdAt), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </span>
            </div>
            <p className="line-clamp-2 text-sm mt-2">
              {item.post.shortDescription}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
