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

const CreateNodeModal = ({ diagramId }: { diagramId: Id<"diagrams"> }) => {
  const { onClose, isOpen, onOpen } = usenodeCreation();
  const create = useMutation(api.entities.add);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string | undefined>(undefined);

  const onCreate = () => {
    const reactFlowContainer = document.querySelector(".react-flow");
    const reactFlowBounds = reactFlowContainer?.getBoundingClientRect();

    let center: { x: number; y: number } = { x: 0, y: 0 };

    if (reactFlowBounds) {
      center = {
        x: (reactFlowBounds.width / 2) * 0.9,
        y: (reactFlowBounds.height / 2) * 0.8,
      };
    }

    const promise = create({ title: title, diagramId, position: center });

    toast.promise(promise, {
      loading: "Creating a new node...",
      success: "Created a new node!",
      error: "Failed to create a new node...",
    });
    onClose();
    setTitle("");
    setDescription(undefined);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Node</DialogTitle>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="link">Title</Label>
          <Input
            className="focus-visible:ring-transparent"
            id="link"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            className="focus-visible:ring-transparent"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost">
              Close
            </Button>
          </DialogClose>
          <Button onClick={onCreate} type="button">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNodeModal;
