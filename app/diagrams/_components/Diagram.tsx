"use client";

import DigramInfoModal from "@/components/modals/DiagramInfoModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useDiagramInfo } from "@/hooks/diagram-information-hook";
import { formatDateToCustomFormat } from "@/lib/utils";
import { ClockIcon, MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import Link from "next/link";

interface DiagramProps {
  id: Id<"diagrams">;
  title: string;
  description?: string;
  createdOn: Date;
}

const Diagram = ({ id, title, description, createdOn }: DiagramProps) => {
  const router = useRouter();
  const { onOpen, setDiagramId } = useDiagramInfo();

  const presetGradients = [
    ["#FFC3A0", "#FFAFBD"],
    ["#FFE259", "#FFA751"],
    ["#6A11CB", "#2575FC"],
    ["#34e89e", "#0f3443"],
    ["#48c6ef", "#6f86d6"],
    // Add more preset gradient combinations here as needed
  ];

  const [gradientColors, setGradientColors] = useState(getRandomGradient());

  function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * presetGradients.length);
    return presetGradients[randomIndex];
  }

  function handleGenerateRandomGradient() {
    setGradientColors(getRandomGradient());
  }

  return (
    <>
      <Card className="group w-[calc(calc(100%/5)-1rem)] cursor-pointer overflow-hidden rounded-lg border transition sm:w-[calc(calc(100%/2)-1rem)] md:w-[calc(calc(100%/4)-1rem)] dark:border-neutral-700 dark:bg-neutral-800">
        <div
          style={{
            background: `linear-gradient(to right, ${gradientColors[0]}, ${gradientColors[1]})`,
          }}
          className="h-[50px] w-[100%] overflow-hidden"
        ></div>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle
              onClick={() => {
                router.push(`/diagrams/${id}`);
              }}
              className="truncate"
            >
              {title}
            </CardTitle>
            <Button
              variant={"ghost"}
              className="pr-0"
              onClick={() => {
                setDiagramId(id);
                onOpen();
              }}
            >
              <MoreVertical />
            </Button>
          </div>
          <CardDescription className="flex flex-row items-center gap-2">
            <ClockIcon className="h-4 w-4" />
            <p>{formatDateToCustomFormat(createdOn)}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </>
    //   {/* <div
    //     onClick={() => {
    //       setDiagramId(id);
    //       onOpen();
    //     }}
    //     className="max-w-xs cursor-pointer overflow-hidden rounded border-[1px] border-gray-500 shadow-lg transition hover:scale-110"
    //   >
    //     <Image src="/public/rand/1.jpg" width={100} height={100}></Image>
    //     <div className="px-6 py-4">
    //       <div className="mb-2 truncate text-xl font-bold">{title}</div>
    //       <p className="text-base text-gray-500">
    //         Created on: {formatDateToCustomFormat(createdOn)}
    //       </p>
    //     </div>
    //   </div>
    // </>

    // <div
    //   key={id}
    //   onClick={() => router.push(`/diagrams/${id}`)}
    //   className=" group w-[250px] h-[140px] rounded-lg border-neutral-700  border flex flex-col p-5  cursor-pointer hover:scale-110 transition shadow-md"
    // >
    //   <div className="flex-1">
    //     <div className="  flex flex-row items-center justify-between transition">
    //       <h1 className="font-bold text-xl truncate">{title}</h1>
    //       <Button
    //         className="opacity-0 group-hover:opacity-100"
    //         variant={"ghost"}
    //       >
    //         <MoreVertical className="h-4 w-4 text-muted-foreground" />
    //       </Button>
    //     </div>
    //     <p className="text-xs text-muted-foreground truncate">{description}</p>
    //   </div >

    //   <hr className="py-2" />
    //   {createdOn && (
    //     <span className="text-xs ">
    //       Created on: {formatDateToCustomFormat(createdOn)}
    //     </span>
    //   )}
    // </div>
  );
};

Diagram.Skeleton = function DiagramSkeleton() {
  return <Skeleton className="h-[140px] w-[250px] rounded-lg" />;
};

export default Diagram;
