import ERDTableNode from "@/components/customNodes/ERDTableNode";
import { RFStore } from "@/hooks/NodeStore";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

const FlowEditor = () => {
  const nodeTypes = { ERDTableNode: ERDTableNode };
  const { nodes, edges, onNodesChange } = RFStore();

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default FlowEditor;
