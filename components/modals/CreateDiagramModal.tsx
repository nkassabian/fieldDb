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
import { ConvexReactClient, useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Doc, Id } from "@/convex/_generated/dataModel";

const CreateDiagramModal = () => {
  const { isOpen, onClose } = useCreation();
  const create = useMutation(api.diagrams.create);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [dbTpye, setDbTpye] = useState<Id<"databaseTypes"> | undefined>(
    undefined
  );

  const client = useConvex();

  const [databaseTypes, setDatabaseTypes] = useState<
    Doc<"databaseTypes">[] | null
  >(null);
  useEffect(() => {
    // Fetch data from the database and update databaseTypes
    fetchDataFromDatabase(client)
      .then((data) => {
        setDatabaseTypes(data);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error("Error fetching data:", error);
      });
  }, [client]);

  const onCreate = () => {
    const promise = create({ title: title, description });

    toast.promise(promise, {
      loading: "Creating a new diagram...",
      success: "Created a new diagram!",
      error: "Failed to create a new diagram...",
    });
    onClose();
    setTitle("");
    setDescription(undefined);
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
          <Label>Select Datbase:</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a database" />
            </SelectTrigger>
            <SelectContent onChange={() => console.log("changed")}>
              {databaseTypes &&
                databaseTypes.map((type) => (
                  <SelectItem key={type._id} value={type._id}>
                    {type.title}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
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

async function fetchDataFromDatabase(client: ConvexReactClient) {
  return await client.query(api.databaseTypes.getDatabaseTypes);
}
