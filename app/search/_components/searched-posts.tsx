"use client";

import { Separator } from "@/components/ui/separator";
import placeholder from "@/public/images/image-placeholder.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { getSearchedPosts } from "@/queries/get-searched-posts";
import { PulseLoader } from "react-spinners";
import Link from "next/link";

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

type SearchedPosts = {
  searchQuery: string | string[] | undefined;
};

export const SearchedPosts = ({ searchQuery }: SearchedPosts) => {
  const [query, setQuery] = useState<string | string[] | undefined>(
    searchQuery
  );
  const searchedPostsQuery = getSearchedPosts(query);
  const data: Post[] = searchedPostsQuery.data;
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (ref.current) {
      const newQuery = ref.current.value;
      setQuery(newQuery);
      router.push(`/search?q=${newQuery}`);
    }
  };

  if (searchedPostsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-[400px]">
        <PulseLoader />
      </div>
    );
  }

  return (
    <div className="w-full px-3">
      <div>
        <p>Resultados para</p>
        <form className="flex items-center h-16" onSubmit={handleSubmit}>
          <input
            className="w-full h-full py-3 text-3xl border-b focus-visible:ring-0 focus-visible:outline-none"
            defaultValue={query}
            ref={ref}
          />
          <button
            type="submit"
            className="flex items-center justify-center w-14 h-full">
            <IoSearchOutline className="mx-auto text-2xl" />
          </button>
        </form>
      </div>
      {data.length === 0 ? (
        <div className="flex justify-center items-center mt-14 h-[300px]">
          <h1 className="text-2xl text-gray-400">
            Não há resultados para sua pesquisa
          </h1>
        </div>
      ) : (
        <div className="mt-14">
          {data.length === 1 ? (
            <h1>Há {data.length} resultado para sua pesquisa</h1>
          ) : (
            <h1>Há {data.length} resultados para sua pesquisa</h1>
          )}
          <Separator className="w-full my-5" />
          <div className="space-y-8">
            {data.map((item, index) => (
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
                  <p className="line-clamp-2 text-sm">
                    {item.post.description}
                  </p>
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
      )}
    </div>
  );
};
