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

const CreateDiagramModal = () => {
  const { isOpen, onClose } = useCreation();
  const create = useMutation(api.diagrams.create);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onCreate = () => {
    const promise = create({ title: title, description });

    toast.promise(promise, {
      loading: "Creating a new diagram...",
      success: "Created a new diagram!",
      error: "Failed to create a new diagram...",
    });
    onClose();
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create Diagram</DialogTitle>
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

export default CreateDiagramModal;
