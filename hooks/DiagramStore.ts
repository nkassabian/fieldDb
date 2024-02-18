import { create } from "zustand";
import { Doc } from "@/convex/_generated/dataModel";
type DiagramStoreState = {
  diagrams: Doc<"diagrams">[] | undefined;
  setDiagrams: (diagrams: Doc<"diagrams">[] | undefined) => void;
  viewType: string;
  setViewType: (type: string) => void;
};

export const DiagramStore = create<DiagramStoreState>((set, get) => ({
  diagrams: undefined,
  setDiagrams: (diagrams: Doc<"diagrams">[] | undefined) => {
    set({
      diagrams: diagrams,
    });
  },
  viewType: "list",
  setViewType: (type: string) => {
    set({
      viewType: type,
    });
  },
}));
