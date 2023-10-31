"use client";
import ERDTableNode from "@/components/customNodes/ERDTableNode";
import CreateNodeModal from "@/components/modals/CreateNodeModal";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";

import "reactflow/dist/style.css";
import Sidebar from "./_components/Sidebar";
import { RFStore } from "@/hooks/NodeStore";
import FlowEditor from "./_components/FlowEditor";
import { useEffect } from "react";

interface DocumentIdPageProps {
  params: {
    diagramId: Id<"diagrams">;
  };
}

//TODO: Change from any
const DoagramIdPage = ({ params }: DocumentIdPageProps) => {
  const { setNodes } = RFStore();

  const diagram: any = useQuery(api.diagrams.getById, {
    diagramId: params.diagramId,
  });

  console.log("diagram:", diagram);

  var items = diagram?.entities?.map((entity: Doc<"entities">) => {
    return {
      id: entity._id,
      type: "ERDTableNode",
      position: { x: entity.xPos, y: entity.yPos },
      data: { label: entity.title },
    };
  });

  useEffect(() => {
    if (items != undefined) {
      console.log("test test");
      setNodes(items);
    }
  }, [diagram]);

  return (
    <>
      {diagram && (
        <div className="flex flex-row border-t border-nuetral-200 h-[calc(100% - 88px)] ">
          <CreateNodeModal diagramId={diagram._id} />
          <Sidebar />
          <FlowEditor />
          <div className="w-[400px] shadow-lg"></div>
        </div>
      )}
    </>
  );
};

export default DoagramIdPage;
