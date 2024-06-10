"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Fade from "embla-carousel-fade";
import useEmblaCarousel from "embla-carousel-react";
import { Progress } from "@/components/ui/progress";

type Post = {
  post: {
    imageUrl: string;
    title: string;
  };
};

type MainPageCarouselProps = {
  posts: { data: Post[] };
};

export const MainPageCarousel = ({ posts }: MainPageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [progressValues, setProgressValues] = useState<number[]>([]);
  const autoplayDelay = 5000;

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
      setProgressValues(new Array(posts.data.length).fill(0)); // Reset all progress values when a slide is selected
    },
    [emblaApi, posts.data.length]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    // Initialize progress values
    setProgressValues(new Array(posts.data.length).fill(0));
  }, [emblaApi, onSelect, posts.data.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValues((prev) =>
        prev.map((value, index) =>
          index === selectedIndex ? Math.min(value + 1, 100) : value
        )
      );
    }, autoplayDelay / 100);

    return () => clearInterval(interval);
  }, [selectedIndex, autoplayDelay]);

  useEffect(() => {
    if (progressValues[selectedIndex] === 100) {
      setProgressValues((prev) =>
        prev.map((value, index) => (index === selectedIndex ? 0 : value))
      );
      emblaApi && emblaApi.scrollNext();
    }
  }, [progressValues, selectedIndex, emblaApi]);

  useEffect(() => {
    setProgressValues(new Array(posts.data.length).fill(0)); // Reset all progress values when selectedIndex changes
  }, [selectedIndex, posts.data.length]);

  return (
    <div className="relative w-[950px] h-[612px] bg-black">
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {posts.data.map((item, index) => (
            <div key={index} className="relative flex-[0_0_100%]">
              <div className="absolute -left-1 w-[500px] h-full z-10 bg-blackoverlay"></div>
              <div className="relative w-full h-[500px]">
                <Image
                  src={item.post.imageUrl}
                  alt={item.post.title}
                  layout="fill"
                  className="object-cover"
                />
                <div className="absolute left-0 w-80 h-full pointer-events-none text-white z-10">
                  {item.post.title}
                </div>
                <div className="absolute bottom-0 w-full h-12 bg-blackoverlayup"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 flex justify-between w-full h-28">
        {posts.data.map((item, index) => (
          <div
            key={index}
            onClick={() => scrollTo(index)}
            className={`cursor-pointer border text-[10px] text-white p-2 ${
              selectedIndex === index ? "bg-gray-700" : ""
            }`}>
            <Progress value={progressValues[index]} className="w-full" />
            <p>{item.post.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
