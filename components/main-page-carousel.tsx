"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/legacy/image";
import Fade from "embla-carousel-fade";
import AutoPlay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import placeholder from "@/public/images/image-placeholder.jpg";
import { Progress } from "@/components/ui/progress";
import { MoonLoader } from "react-spinners";
import { cn } from "@/lib/utils";
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

type MainPageCarouselProps = {
  posts: { data: Post[] };
};

export const MainPageCarousel = ({ posts }: MainPageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    AutoPlay({ playOnInit: true, delay: 5000 }),
    Fade(),
  ]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    setIsLoading(false);
  }, [emblaApi, onSelect, posts.data.length]);

  return (
    <div className="relative w-full h-[500px] md:h-[612px] bg-black">
      <div ref={emblaRef} className="overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-[500px] md:h-[612px]">
            <MoonLoader color="#FFFFFF" />
          </div>
        ) : (
          <div className="flex h-[500px] md:h-[612px]">
            {posts.data.map((item, index) => (
              <div key={index} className="relative flex-[0_0_100%]">
                <div className="absolute -left-1 w-[500px] h-full z-10 bg-blackoverlay maxmd:hidden"></div>
                <div className="relative w-full h-[500px]">
                  <Image
                    src={item.post.imageUrl ?? placeholder}
                    alt={item.post.title}
                    layout="fill"
                    priority
                    sizes="100vw"
                    className={cn(
                      "object-cover",
                      selectedIndex === index && "scale-animation"
                    )}
                  />
                  <div className="absolute left-0 w-[400px] h-full text-white z-10 maxmd:hidden">
                    <div className="flex justify-center items-center pl-4 h-full">
                      <div>
                        <div className="space-y-2 pointer-events-none pb-4">
                          <h1 className="text-2xl">{item.post.title}</h1>
                          <h2 className="text-sm">
                            {item.post.shortDescription}
                          </h2>
                        </div>
                        <Link href={`/post/${item.post.id}`}>
                          <button className="py-1 px-3 rounded-lg border border-white bg-white text-black hover:bg-transparent hover:text-white transition-colors">
                            Ler mais
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 w-full h-[200px] pt-28 md:pt-0 bg-blackoverlayup">
                    <h1 className="text-white pl-2 md:hidden">
                      {item.post.title}
                    </h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 flex justify-between w-full h-6 md:h-28">
        {posts.data.map((item, index) => (
          <div
            key={index}
            onClick={() => scrollTo(index)}
            className="basis-full cursor-pointer">
            <div
              className={cn(
                selectedIndex !== index && "opacity-50",
                "w-11/12 mx-auto text-white hover:opacity-100"
              )}>
              <div
                className={cn(
                  selectedIndex === index ? "bg-white" : "bg-gray-500",
                  "h-[5px] w-full rounded-lg overflow-hidden"
                )}></div>
              <p className="text-[12px] maxmd:hidden mt-1">{item.post.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
