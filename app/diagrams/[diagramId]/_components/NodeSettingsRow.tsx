import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
import { useMutation } from "convex/react";
import { KeyRound, MoreVertical, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const NodeSettingRow = ({ row }: { row: Doc<"rows"> }) => {
  const updateRowTitle = useMutation(api.rows.changeRowName);
  const updateRowType = useMutation(api.rows.changeRowType);
  const deleteRow = useMutation(api.rows.deleteRow);

  const [rowType, setRowType] = useState(row.rowTypeId);

  const { rowTypes } = RFStore();

  const [rowName, setRowName] = useState<string | undefined>(row.title);

  const changeRowName = (rowName: string) => {
    updateRowTitle({ rowId: row._id, title: rowName });
    setRowName(rowName);
  };

  const changeRowType = (newId: Id<"rowTypes">) => {
    updateRowType({ rowId: row._id, typeId: newId as Id<"rowTypes"> });
    setRowType(newId as Id<"rowTypes">);
  };

  const onDelete = (rowId: Id<"rows">) => {
    var promise = deleteRow({ rowId });
  };

  const dataTypesList = useMemo(() => {
    if (rowTypes != undefined) {
      return rowTypes.map((value) => (
        <SelectItem key={value._id} value={value._id}>
          {value.title}
        </SelectItem>
      ));
    } else {
      return <div></div>;
    }
  }, [rowTypes]);

  return (
    <div className="flex flex-row">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant={"ghost"} className="px-1">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="p-0 m-0">
              <Button
                variant={"destructive"}
                onClick={() => {
                  onDelete(row._id);
                }}
                className="w-full"
              >
                <Trash2 className="h-4 w-4 ml-2" /> Trash
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div>
        <Input
          placeholder="row name"
          id="tablename"
          value={rowName}
          onChange={(e) => changeRowName(e.target.value)}
          className="h-8 focus-visible:ring-transparent"
        />
      </div>
      <div>
        <Select
          onValueChange={(newValue) => {
            changeRowType(newValue as Id<"rowTypes">);
          }}
          value={rowType}
        >
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
    </div>
  );
};

export default NodeSettingRow;
