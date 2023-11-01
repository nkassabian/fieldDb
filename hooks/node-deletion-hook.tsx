import { create } from "zustand";

type NodeDeletionStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNodeDeleteion = create<NodeDeletionStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
