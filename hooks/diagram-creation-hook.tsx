import { create } from "zustand";

type CreationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreation = create<CreationStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
