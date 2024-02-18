"use client";

import Head from "next/head";
import { api } from "@/convex/_generated/api";
import { ConvexReactClient, useConvex, useQuery } from "convex/react";
import Image from "next/image";
import Diagram from "./_components/Diagram";
import DiagramHeader from "./_components/DiagramHeader";
import { useEffect, useState } from "react";
import SearchBar from "./_components/SearchBar";
import { DiagramStore } from "@/hooks/DiagramStore";
import ViewSwitcher from "./_components/ViewSwitcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Doc } from "@/convex/_generated/dataModel";
import { ModalProvider } from "@/providers/modal-providers";

const Page = () => {
  const { diagrams, setDiagrams } = DiagramStore();

  const fetchedDiagrams = useQuery(api.diagrams.getDiagrams, {});
  console.log("FETCHED", fetchedDiagrams);
  useEffect(() => {
    document.title = "Diagrams";
  }, []);

  useEffect(() => {
    if (fetchedDiagrams) {
      setDiagrams(fetchedDiagrams);
    }
  }, [fetchedDiagrams]);

  const client = useConvex();

  const [databaseTypes, setDatabaseTypes] = useState<
    Doc<"databaseTypes">[] | null
  >(null);

  useEffect(() => {
    fetchDataFromDatabase(client)
      .then((data) => {
        setDatabaseTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [client]);

  return (
    <>
      <Head>
        <title>Diagrams</title>
      </Head>
      <div className=" px-[10em]">
        <DiagramHeader />
        <ModalProvider />

        <div className="flex w-[100%] flex-row items-center justify-between">
          <SearchBar />
          <div className="flex flex-row gap-2">
            <Select onValueChange={(val) => console.log(val)}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {databaseTypes &&
                  databaseTypes.map((type) => (
                    <SelectItem key={type._id} value={type._id}>
                      {type.title}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <ViewSwitcher />
          </div>
        </div>
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

async function fetchDataFromDatabase(client: ConvexReactClient) {
  return await client.query(api.databaseTypes.getDatabaseTypes);
}
