"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { formatDateToCustomFormat } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { toast } from "sonner";
import Diagram from "./_components/Diagram";
import DiagramHeader from "./_components/DiagramHeader";
import { useEffect } from "react";
import CreateDiagramModal from "@/components/modals/CreateDiagramModal";

const Page = () => {
  const diagrams = useQuery(api.diagrams.getDiagrams);

  return (
    <div className=" px-[10em]">
      <DiagramHeader />
      <CreateDiagramModal />

      {diagrams?.length === 0 && (
        <div className="flex flex-col items-center justify-center ">
          <Image
            src="/empty.svg"
            height={"300"}
            width={"300"}
            alt="empty"
            className="dark:hidden"
          />
          <Image
            src="/empty-dark.svg"
            height={"300"}
            width={"300"}
            alt="empty"
            className=" dark:block hidden"
          />
          <h1 className="font-bold text-4xl">Wow! So empty!</h1>
          <p className=" text-muted-foreground">
            Lets start by creating a new diagram!
          </p>
        </div>
      )}

      {diagrams === undefined && (
        <>
          <div
            className="p-10 w-full rounded-xl flex 
      flex-row justify-start items-center flex-wrap gap-4"
          >
            <Diagram.Skeleton />
            <Diagram.Skeleton />
            <Diagram.Skeleton />
          </div>
        </>
      )}
      {diagrams &&
        diagrams.map((diagram) => (
          <Diagram
            key={diagram._id}
            title={diagram.title}
            id={diagram._id}
            description={diagram.description}
            createdOn={new Date(diagram._creationTime)}
          />
        ))}
    </div>
  );
};

export default Page;
