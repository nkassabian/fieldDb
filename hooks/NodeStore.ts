// store.ts
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
  setNodes: (nodes: Node[]) => void;
  // setEdges: (nodes: Node[]) => void;
  onNodesChange: OnNodesChange;
};

// this is our useStore hook that we can use in our components to get parts of the store and call actions
export const RFStore = create<RFState>((set, get) => ({
  nodes: [],
  edges: [],
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
}));
