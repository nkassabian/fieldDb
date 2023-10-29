"use client";
import ERDTableNode from "@/components/customNodes/ERDTableNode";
import CreateNodeModal from "@/components/modals/CreateNodeModal";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { DatabaseZap, Grab, Import, LucideTable2 } from "lucide-react";
import React, { useState } from "react";
import ReactFlow, { Background, Controls, MiniMap, Panel } from "reactflow";

import "reactflow/dist/style.css";

const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

interface DocumentIdPageProps {
  params: {
    diagramId: Id<"diagrams">;
  };
}

//TODO: hange from any
const DoagramIdPage = ({ params }: DocumentIdPageProps) => {
  const diagram: any = useQuery(api.diagrams.getById, {
    diagramId: params.diagramId,
  });

  const [nodeCreateModal, setNodeCreateModal] = useState(false);

  console.log("diagram:", diagram);

  const nodeTypes = { ERDTableNode: ERDTableNode };

  const initialNodes = diagram?.entities?.map((entity: Doc<"entities">) => {
    return {
      id: entity._id,
      type: "ERDTableNode",
      position: { x: entity.xPos, y: entity.yPos },
      data: { label: entity.title },
    };
  });

  return (
    <>
      {diagram && (
        <div className="flex flex-row border-t border-nuetral-200 h-[calc(100% - 88px)] ">
          <CreateNodeModal
            isOpen={nodeCreateModal}
            onClose={() => setNodeCreateModal(!nodeCreateModal)}
            diagramId={diagram._id}
          />
          <div className="w-12 flex flex-col align-center  gap-y-2 border-r border-nuetral-200">
            <Button variant={"ghost"} className="p-3">
              <Grab className="w-10 h-10 text-muted-foreground" />
            </Button>
            <Button
              onClick={() => {
                setNodeCreateModal(true);
              }}
              variant={"ghost"}
              className="p-3"
            >
              <LucideTable2 className="w-10 h-10 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} className="p-3">
              <DatabaseZap className="w-10 h-10 text-muted-foreground" />
            </Button>
            <Button variant={"ghost"} className="p-3">
              <Import className="w-10 h-10 text-muted-foreground" />
            </Button>
          </div>
          <div style={{ width: "100vw", height: "calc(100vh - 88px)" }}>
            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              nodeTypes={nodeTypes}
            >
              <Controls />
              <MiniMap />
              <Background gap={12} size={1} />
            </ReactFlow>
          </div>

          <div className="w-[400px] shadow-lg"></div>
        </div>
      )}
    </>
  );
};

export default DoagramIdPage;
