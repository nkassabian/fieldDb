import ERDTableNode from "@/components/customNodes/ERDTableNode";
import { RFStore } from "@/hooks/NodeStore";
import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node } from "reactflow";

const FlowEditor = () => {
  const nodeTypes = useMemo(() => ({ ERDTableNode: ERDTableNode }), []);
  const { nodes, edges, onNodesChange, setSelectedNode, selectedNode } =
    RFStore();

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onPaneClick = (event: React.MouseEvent) => {
    setSelectedNode(undefined);
  };

  const RFRenderer = useMemo(
    () => (
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
      >
        <Controls />
        <MiniMap />
        <Background gap={12} size={1} />
      </ReactFlow>
    ),
    [nodes]
  );

  return (
    <div style={{ width: "100vw", height: "calc(100vh - 64px)" }}>
      {RFRenderer}
    </div>
  );
};

export default FlowEditor;
