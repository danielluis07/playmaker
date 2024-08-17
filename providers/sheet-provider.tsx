"use client";

import { useEffect, useState } from "react";
import { SearchSheet } from "@/components/search-sheet";
import { ExitModal } from "@/modals/exit-modal";

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
      <ExitModal />
      <SearchSheet />
    </>
  );
};
