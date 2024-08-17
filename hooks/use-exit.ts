import { create } from "zustand";

type ExitStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useExit = create<ExitStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
