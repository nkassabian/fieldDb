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
import { ClockIcon, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

const diagramVariants = cva(
  "group w-[100vw] cursor-pointer overflow-hidden dark:border-neutral-700 dark:bg-neutral-800",
  {
    variants: {
      size: {
        default: "h-24",
        compact: "h-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

interface DiagramProps extends VariantProps<typeof diagramVariants> {
  id: Id<"diagrams">;
  title: string;
  description?: string;
  createdOn: Date;
}

const DiagramList = ({ size, id, title, createdOn }: DiagramProps) => {
  const presetGradients = [
    ["#FFC3A0", "#FFAFBD"],
    ["#FFE259", "#FFA751"],
    ["#6A11CB", "#2575FC"],
    ["#34e89e", "#0f3443"],
    ["#48c6ef", "#6f86d6"],
  ];

  const [gradientColors] = useState(getRandomGradient());

  function getRandomGradient() {
    const randomIndex = Math.floor(Math.random() * presetGradients.length);
    return presetGradients[randomIndex];
  }

  return (
    <ul className="w-[100vw] cursor-pointer divide-y divide-gray-200 dark:divide-gray-700">
      <li className="border-b-2 pb-3 sm:pb-4">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="flex-shrink-0"></div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
              {title}
            </p>
            <p className="flex flex-row items-center gap-1 truncate text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="h-3 w-3" />
              <p>{formatDateToCustomFormat(createdOn)}</p>{" "}
            </p>
          </div>
          <Button variant={"secondary"}>Edit</Button>
          <Button>Open diagram</Button>
        </div>
      </li>
    </ul>
  );
};

export default DiagramList;
