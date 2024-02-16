"use client";

import DigramInfoModal from "@/components/modals/DiagramInfoModal";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { useDiagramInfo } from "@/hooks/diagram-information-hook";
import { cn, formatDateToCustomFormat } from "@/lib/utils";
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
import { DiagramStore } from "@/hooks/DiagramStore";

interface DiagramProps {
  id: Id<"diagrams">;
  title: string;
  description?: string;
  createdOn: Date;
}

const Diagram = ({ id, title, description, createdOn }: DiagramProps) => {
  const router = useRouter();
  const { onOpen, setDiagramId } = useDiagramInfo();
  const { viewType } = DiagramStore();
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
      <Card
        className={cn(
          "group w-[calc(calc(100%/5)-1rem)] cursor-pointer overflow-hidden rounded-lg border transition sm:w-[calc(calc(100%/2)-1rem)] md:w-[calc(calc(100%/4)-1rem)] dark:border-neutral-700 dark:bg-neutral-800",
          viewType !== "list" ? "block" : "hidden",
        )}
      >
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
      <div className={cn("w-full", viewType === "list" ? "block" : "hidden")}>
        <div className="hover:bg-muted group flex h-16 cursor-pointer flex-row items-center overflow-hidden rounded-lg  transition dark:border-neutral-700">
          <div
            className="flex flex-1 flex-row  gap-3 px-4 py-2"
            onClick={() => router.push(`/diagrams/${id}`)}
          >
            <p className="truncate text-xl font-semibold">{title}</p>
            <div className="flex items-center gap-1">
              <ClockIcon className="text-muted-foreground h-3 w-3" />
              <p className="text-muted-foreground text-xs">
                {formatDateToCustomFormat(createdOn)}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            className="pr-0"
            onClick={() => {
              setDiagramId(id);
              onOpen();
            }}
          >
            <MoreVertical />
          </Button>
        </div>
      </div>
      <hr
        className={cn(
          " border-muted-foreground m-0 h-[1px] w-full p-0",
          viewType === "list" ? "block" : "hidden",
        )}
      />
    </>
  );
};

Diagram.Skeleton = function DiagramSkeleton() {
  return <Skeleton className="h-[140px] w-[250px] rounded-lg" />;
};

export default Diagram;
