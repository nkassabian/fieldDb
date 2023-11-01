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
import { Id } from "@/convex/_generated/dataModel";
import { RFStore } from "@/hooks/NodeStore";
import { useNodeDeleteion } from "@/hooks/node-deletion-hook";
import { cn } from "@/lib/utils";
import {
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useMutation } from "convex/react";
import { KeyRound, MoreVertical, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const dataTypes = [
  "int", // Default: 0
  "bigint", // Default: 0
  "smallint", // Default: 0
  "tinyint", // Default: 0
  "numeric(18,2)", // Default: Custom value for precision and scale
  "decimal(18,2)", // Default: Custom value for precision and scale
  "float(53)", // Default: 0.0
  "real", // Default: 0.0
  "char(1)", // Default: ""
  "varchar(255)", // Default: ""
  "text", // Default: ""
  "binary(1)", // Default: Custom value for length
  "varbinary(1)", // Default: Custom value for length
  "image", // Default: Custom binary data
  "date", // Default: "0000-00-00"
  "time", // Default: "00:00:00"
  "datetime", // Default: "0000-00-00 00:00:00"
  "smalldatetime", // Default: "0000-00-00 00:00:00"
  "bit", // Default: false
  "uniqueidentifier", // Default: Custom unique identifier
  "xml", // Default: "<xml_data>"
  "sql_variant", // Default: "sql_variant_data"
  "timestamp", // Default: Custom binary data
  "geography", // Default: "geography_data"
  "geometry", // Default: "geometry_data"
  "hierarchyid", // Default: "hierarchyid_data"
  "money", // Default: 0.00
];

const NodeSettings = () => {
  const { selectedNode } = RFStore();
  const [title, setTitle] = useState<string | undefined>(
    selectedNode?.data.label
  );

  const updateTitle = useMutation(api.entities.updateTitle);

  const onTitleChange = (content: string) => {
    setTitle(content);

    updateTitle({
      entityId: selectedNode?.id as Id<"entities">,
      title: content,
    });
  };

  useEffect(() => {
    console.log("Settings: ", selectedNode);
    setTitle(selectedNode?.data.label);
  }, [selectedNode]);

  const { onOpen } = useNodeDeleteion();

  const dataTypesList = useMemo(() => {
    return dataTypes.map((value) => (
      <SelectItem key={value} value={value}>
        {value}
      </SelectItem>
    ));
  }, []);

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
        <div className="flex flex-row gap-x-2 items-center justify-center">
          {/* TODO:Uncomment when rows are added */}
          {/* {selectedNode != undefined &&
            selectedNode.data.columns.map((column: any) => (
              <>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={"ghost"} className="px-1">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem className="p-0 m-0">
                        <Button variant={"destructive"} className="w-full">
                          <Trash2 className="h-4 w-4" /> Trash
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div>
                  <Input
                    placeholder="row name"
                    id="tablename"
                    className="h-8 focus-visible:ring-transparent"
                  />
                </div>
                <div>
                  <Select>
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="datatype" />
                    </SelectTrigger>
                    <SelectContent className="h-52 rounded-sm">
                      <SelectGroup>{dataTypesList}</SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Toggle>N</Toggle>
                </div>
                <div>
                  <Toggle>
                    <KeyRound className="h-4 w-4" />
                  </Toggle>
                </div>
              </>
            ))} */}
        </div>
        <div className="relative flex py-5 items-center">
          <div className="flex-grow border-t border-foreground-muted"></div>
          <span className="flex-shrink mx-4 text-foreground-muted text-xs">
            <Button
              variant={"ghost"}
              className="text-foreground-muted"
              size={"sm"}
            >
              <Plus className="w-4 h-4 text-foreground-muted" />
            </Button>
          </span>
          <div className="flex-grow border-t border-foreground-muted"></div>
        </div>
      </div>
    </>
  );
};

export default NodeSettings;
