// store.ts
import { Doc } from "@/convex/_generated/dataModel";
import {
  Edge,
  Node,
  NodeChange,
  OnNodesChange,
  Position,
  XYPosition,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";

//TODO: Add color input isOpened state in here, need it to be global

type RFState = {
  nodes: Node[];
  edges?: Edge[];
  rowTypes?: Doc<"databaseTypes">[];
  selectedNode: Node | undefined;
  setSelectedNode: (node: Node | undefined) => void;
  setNodes: (nodes: Node[]) => void;
  setRowTypes: (rowTypes: Doc<"databaseTypes">[]) => void;
  // setEdges: (nodes: Node[]) => void;
  onNodesChange: OnNodesChange;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const RFStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: undefined,
  setSelectedNode: (node: Node | undefined) => {
    set({
      selectedNode: node,
    });
  },
  setNodes: (nodes: Node[]) => {
    set({
      nodes: nodes,
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  setRowTypes: (rowTypes: Doc<"databaseTypes">[]) => {
    set({
      rowTypes: rowTypes,
    });
  },
}));
