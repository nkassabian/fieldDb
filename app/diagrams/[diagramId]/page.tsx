"use client";
import ERDTableNode from "@/components/customNodes/ERDTableNode";
import CreateNodeModal from "@/components/modals/CreateNodeModal";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

import "reactflow/dist/style.css";
import Sidebar from "./_components/Sidebar";
import { RFStore } from "@/hooks/NodeStore";
import FlowEditor from "./_components/FlowEditor";
import { useEffect } from "react";
import DeleteTableModal from "@/components/modals/DeleteTableModal";

interface DocumentIdPageProps {
  params: {
    diagramId: Id<"diagrams">;
  };
}

//TODO: Change from any
const DiagramIdPage = ({ params }: DocumentIdPageProps) => {
  const { setNodes, setRowTypes } = RFStore();

  const diagram: any = useQuery(api.diagrams.getById, {
    diagramId: params.diagramId,
  });

  const { selectedNode } = RFStore();

  var items = diagram?.entities?.map((entity: Doc<"entities">) => {
    return {
      id: entity._id,
      type: "ERDTableNode",
      position: { x: entity.xPos, y: entity.yPos },
      data: { label: entity.title, ...entity },
    };
  });

  var rowTypes = diagram?.rowTypes;

  useEffect(() => {
    if (diagram != undefined) {
      setRowTypes(rowTypes);
    }
  }, [diagram]);

  useEffect(() => {
    if (items != undefined) {
      setNodes(items);
    }
  }, [diagram]);

  return (
    <>
      {diagram && (
        <div className="flex flex-row border-t border-nuetral-200 h-[calc(100% - 88px)] ">
          <CreateNodeModal diagramId={diagram._id} />
          <DeleteTableModal entityId={selectedNode?.id as Id<"entities">} />
          <Sidebar />
          <FlowEditor />
        </div>
      )}
    </>
  );
};

export default DiagramIdPage;
