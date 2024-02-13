import { create } from "zustand";
import { Doc } from "@/convex/_generated/dataModel";
type DiagramStoreState = {
  diagrams: Doc<"diagrams">[] | undefined;
  setDiagrams: (diagrams: Doc<"diagrams">[] | undefined) => void;
};

export const DiagramStore = create<DiagramStoreState>((set, get) => ({
  diagrams: undefined,
  setDiagrams: (diagrams: Doc<"diagrams">[] | undefined) => {
    set({
      diagrams: diagrams,
    });
  },
}));
