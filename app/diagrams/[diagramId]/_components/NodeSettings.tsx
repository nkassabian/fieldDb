import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { RFStore } from "@/hooks/NodeStore";
import { useNodeDeleteion } from "@/hooks/node-deletion-hook";
import { cn } from "@/lib/utils";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  ConvexReactClient,
  useConvex,
  useMutation,
  useQuery,
} from "convex/react";
import { KeyRound, MoreVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import NodeSettingRow from "./NodeSettingsRow";
import { toast } from "sonner";

const NodeSettings = ({
  diagramId,
  diagram,
}: {
  diagramId: Id<"diagrams">;
  diagram: any;
}) => {
  const { selectedNode } = RFStore();

  const [title, setTitle] = useState<string | undefined>(
    selectedNode?.data.label
  );

  const desiredEntity = diagram.entities.find(
    (entity: any) => entity._id === selectedNode?.id
  );

  const updateTitle = useMutation(api.entities.updateTitle);
  const addRow = useMutation(api.rows.create);

  const onRowCreate = () => {
    const promise = addRow({
      enittyId: selectedNode?.id,
      diagramId: diagramId,
    });

    toast.promise(promise, {
      loading: "Addeding a new row...",
      success: "Added a new row!",
      error: "Failed to add a new row...",
    });
  };

  const onTitleChange = (content: string) => {
    setTitle(content);

    updateTitle({
      entityId: selectedNode?.id as Id<"entities">,
      title: content,
    });
  };

  useEffect(() => {
    setTitle(selectedNode?.data.label);
  }, [selectedNode]);

  const { onOpen } = useNodeDeleteion();

  return (
    <>
      <div
        className={cn(
          "transition-all",
          selectedNode !== undefined
            ? "w-[500px] shadow-lg p-5"
            : "w-0 opacity-0"
        )}
      >
        <div className="flex flex-row items-center justify-between mb-5 ">
          <h1 className="font-bold text-xl">Table Settings</h1>
          <Button variant={"destructive"} onClick={onOpen}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <Label htmlFor="tablename">Name</Label>
        <Input
          onChange={(e) => onTitleChange(e.target.value)}
          value={title}
          id="tablename"
          className="h-8 focus-visible:ring-transparent"
        />
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-foreground-muted"></div>
          <span className="flex-shrink mx-4 text-foreground-muted text-xs">
            Rows
          </span>
          <div className="flex-grow border-t border-foreground-muted"></div>
        </div>
        <div className="flex flex-col gap-x-2 items-center justify-center">
          {/* TODO:Uncomment when rows are added */}
          {selectedNode != undefined &&
            desiredEntity?.rows.map((row: Doc<"rows">) => (
              <>
                <NodeSettingRow row={row} />
              </>
            ))}
        </div>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-foreground-muted"></div>
          <span className="flex-shrink mx-4 text-foreground-muted text-xs">
            <Button
              variant={"ghost"}
              className="text-foreground-muted"
              size={"sm"}
            >
              <Plus
                onClick={onRowCreate}
                className="w-4 h-4 text-foreground-muted"
              />
            </Button>
          </span>
          <div className="flex-grow border-t border-foreground-muted"></div>
        </div>
      </div>
    </>
  );
};

export default NodeSettings;
