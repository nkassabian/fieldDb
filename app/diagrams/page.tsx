"use client";

import { Button } from "@/components/ui/button";
import Head from "next/head";

import { api } from "@/convex/_generated/api";
import { formatDateToCustomFormat } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import Image from "next/image";
import { toast } from "sonner";
import Diagram from "./_components/Diagram";
import DiagramHeader from "./_components/DiagramHeader";
import { useEffect } from "react";
import CreateDiagramModal from "@/components/modals/CreateDiagramModal";
import DigramInfoModal from "@/components/modals/DiagramInfoModal";
import { Metadata } from "next";
import { Props } from "next/script";

const Page = () => {
  const diagrams = useQuery(api.diagrams.getDiagrams);

  var convex = useConvex();

  useEffect(() => {
    document.title = "Diagrams";
  }, []);

  return (
    <>
      <Head>
        <title>Diagrams</title>
      </Head>
      <div className=" px-[10em]">
        <DiagramHeader />
        <CreateDiagramModal />
        <DigramInfoModal />

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
              className=" hidden dark:block"
            />
            <h1 className="text-4xl font-bold">Wow! So empty!</h1>
            <p className=" text-muted-foreground">
              Lets start by creating a new diagram!
            </p>
          </div>
        )}

        {diagrams === undefined && (
          <>
            <div
              className="flex w-full flex-row flex-wrap
      items-center justify-start gap-4 rounded-xl p-10"
            >
              <Diagram.Skeleton />
              <Diagram.Skeleton />
              <Diagram.Skeleton />
            </div>
          </>
        )}
        <div
          className="flex w-full flex-row flex-wrap
      items-center justify-start gap-4 rounded-xl p-10"
        >
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
      </div>
    </>
  );
};

export default Page;
