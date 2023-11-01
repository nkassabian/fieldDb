"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCreation } from "@/hooks/diagram-creation-hook";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useState } from "react";
import { XYPosition } from "reactflow";
import { useParams, useRouter } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { usenodeCreation } from "@/hooks/table-creation-hook";
import { useNodeDeleteion } from "@/hooks/node-deletion-hook";
import { Trash2 } from "lucide-react";

const DeleteTableModal = ({ entityId }: { entityId: Id<"entities"> }) => {
  const { onClose, isOpen, onOpen } = useNodeDeleteion();

  const remove = useMutation(api.entities.remove);

  const onRemove = () => {
    const promise = remove({
      id: entityId,
    });

    toast.promise(promise, {
      loading: "Deleting table...",
      success: "Table Deleted!",
      error: "Failed to delete Table.",
    });

    onClose();
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Node?</DialogTitle>
          <DialogDescription>
            This action is permenant and cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={onRemove} type="button" variant={"destructive"}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTableModal;
