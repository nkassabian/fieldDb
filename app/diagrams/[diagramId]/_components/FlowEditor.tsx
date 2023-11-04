import ERDTableNode from "@/components/customNodes/ERDTableNode";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { RFStore } from "@/hooks/NodeStore";
import { useMutation } from "convex/react";
import { useMemo } from "react";
import ReactFlow, { Background, Controls, MiniMap, Node } from "reactflow";

const FlowEditor = () => {
  const nodeTypes = useMemo(() => ({ ERDTableNode: ERDTableNode }), []);
  const { nodes, edges, onNodesChange, setSelectedNode, selectedNode } =
    RFStore();

  const onNodeClick = (event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const updatePosition = useMutation(api.entities.updatePosition);

  const updateNodePosition = (id: string, x: number, y: number) => {
    updatePosition({
      id: id as Id<"entities">,
      xPos: x,
      yPos: y,
    });
  };

  const onNodeDragStop = (
    event: React.MouseEvent,
    node: Node,
    nodes: Node[]
  ) => {
    updateNodePosition(node.id, node.position.x, node.position.y);
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
        onNodeDragStop={onNodeDragStop}
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
