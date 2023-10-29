"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateToCustomFormat } from "@/lib/utils";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";

interface DiagramProps {
  id: string;
  title: string;
  description?: string;
  createdOn?: Date;
}

const Diagram = ({ id, title, description, createdOn }: DiagramProps) => {
  const router = useRouter();

  return (
    <div
      key={id}
      onClick={() => router.push(`/diagrams/${id}`)}
      className="group w-[250px] h-[140px] rounded-lg border-neutral-700  border flex flex-col p-5  cursor-pointer hover:scale-110 transition shadow-md"
    >
      <div className="flex-1">
        <div className="  flex flex-row items-center justify-between transition">
          <h1 className="font-bold text-xl truncate">{title}</h1>
          <Button
            className="opacity-0 group-hover:opacity-100"
            variant={"ghost"}
          >
            <MoreVertical className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground truncate">{description}</p>
      </div>

      <hr className="py-2" />
      {createdOn && (
        <span className="text-xs ">
          Created on: {formatDateToCustomFormat(createdOn)}
        </span>
      )}
    </div>
  );
};

Diagram.Skeleton = function DiagramSkeleton() {
  return <Skeleton className="w-[250px] h-[140px] rounded-lg" />;
};

export default Diagram;
