import { create } from "zustand";

type TableCreationStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const usenodeCreation = create<TableCreationStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
