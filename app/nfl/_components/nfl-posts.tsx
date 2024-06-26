"use client";

import Image from "next/image";
import Link from "next/link";
import placeholder from "@/public/images/image-placeholder.jpg";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Separator } from "@/components/ui/separator";

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

type NbaPostsProps = {
  data: Post;
};

export const NflPosts = ({ data }: NbaPostsProps) => {
  return (
    <div className="w-full px-3">
      <h1 className="text-4xl font-bold py-3">Posts da NFL</h1>
      <Separator className="my-10 w-full" />
      <div className="space-y-8">
        {data.data.map((item, index) => (
          <div className="flex items-center md:items-stretch" key={index}>
            <div className="relative h-32 min-w-32 md:min-w-60 md:h-48 order-last md:order-first">
              <Image
                src={item.post.imageUrl ? item.post.imageUrl : placeholder}
                alt={item.post.title}
                fill
                sizes="(max-width: 768px) 180px, 320px"
              />
            </div>
            <div className="pr-2 md:pl-3 space-y-2 order-first md:order-last">
              <span className="text-white text-[10px] rounded-md bg-black p-1 mt-4">
                {item.post.postType}
              </span>
              <div>
                <Link href={`/post/${item.post.id}`}>
                  <h2 className="font-bold hover:underline cursor-pointer">
                    {item.post.title}
                  </h2>
                </Link>
              </div>
              <p className="line-clamp-2 text-sm">{item.post.description}</p>
              <p className="text-[10px] md:text-sm">
                {format(new Date(item.post.createdAt), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
