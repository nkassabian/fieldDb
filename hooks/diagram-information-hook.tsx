import { Id } from "@/convex/_generated/dataModel";
import { create } from "zustand";

type DiagramInfoStore = {
  isOpen: boolean;
  diagramId: Id<"diagrams"> | undefined;
  onOpen: () => void;
  setDiagramId: (id: Id<"diagrams">) => void;
  onClose: () => void;
};

export const useDiagramInfo = create<DiagramInfoStore>((set, get) => ({
  isOpen: false,
  diagramId: undefined,
  onOpen: () => set({ isOpen: true }),
  setDiagramId: (id) => set({ diagramId: id }),
  onClose: () => set({ isOpen: false }),
}));
