import { cva, type VariantProps } from "class-variance-authority";

import { cn, formatDateToCustomFormat } from "@/lib/utils";
import { Id } from "@/convex/_generated/dataModel";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, ClockIcon, MoreVertical } from "lucide-react";
import { useState } from "react";

const diagramVariants = cva(
  "group cursor-pointer overflow-hidden rounded-lg border transition dark:border-neutral-700 dark:bg-neutral-800",
  {
    variants: {
      size: {
        default:
          "w-[calc(calc(100%/5)-1rem)] sm:w-[calc(calc(100%/2)-1rem)] md:w-[calc(calc(100%/4)-1rem)]",
        sm: "w-[calc(calc(100%/6)-1rem)] sm:w-[calc(calc(100%/3)-1rem)] md:w-[calc(calc(100%/5)-1rem)]",
        lg: "w-[calc(calc(100%/4)-1rem)] sm:w-[calc(calc(100%/1)-1rem)] md:w-[calc(calc(100%/3)-1rem)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

//
const titleSizes = {
  default: "text-xl", // Default size
  sm: "text-lg",
  lg: "text-2xl",
};

const sideMenuSizes = {
  default: "h-4 w-4", // Default size
  sm: "h-3 w-3",
  lg: "h-5 w-5",
};

interface DiagramProps extends VariantProps<typeof diagramVariants> {
  id: Id<"diagrams">;
  title: string;
  description?: string;
  createdOn: Date;
}

const DiagramCard = ({ size, id, title, createdOn }: DiagramProps) => {
  const presetGradients = [
    ["#FFC3A0", "#FFAFBD"],
    ["#FFE259", "#FFA751"],
    ["#6A11CB", "#2575FC"],
    ["#34e89e", "#0f3443"],
    ["#48c6ef", "#6f86d6"],
    // Add more preset gradient combinations here as needed
  ];

  const [gradientColors] = useState(getRandomGradient());

  function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * presetGradients.length);
    return presetGradients[randomIndex];
  }

  return (
    <Card
      className={cn(
        "group ease-in-out hover:scale-105",
        diagramVariants({ size }),
      )}
    >
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle
            className={`truncate ${titleSizes[size ?? "default"]}`} // Apply title size based on size variant
          >
            {title}
          </CardTitle>
          <Button variant={"ghost"} className={`pr-0`}>
            <MoreVertical className={`${sideMenuSizes[size ?? "default"]}`} />
          </Button>
        </div>
        <CardDescription className="flex flex-row items-center gap-2">
          <ClockIcon className="h-4 w-4" />
          <p>{formatDateToCustomFormat(createdOn)}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DiagramCard;
