"use client";

import { useSearch } from "@/hooks/use-search";
import { IoSearchOutline } from "react-icons/io5";

export const Search = () => {
  const { onOpen } = useSearch();

  return (
    <div onClick={onOpen} className="p-3 border border-gray-400 cursor-pointer">
      <IoSearchOutline />
    </div>
  );
};
