"use client";

import { useExit } from "@/hooks/use-exit";
import { BeatLoader } from "react-spinners";

export const ExitModal = () => {
  const { isOpen } = useExit();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed flex justify-center items-center h-full inset-0 z-50 bg-black/80">
      <BeatLoader color="#FFFFFF" />
    </div>
  );
};
