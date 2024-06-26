"use client";

import { useEffect, useState } from "react";
import { SearchSheet } from "@/components/search-sheet";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SearchSheet />
    </>
  );
};
