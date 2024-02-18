"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useCreation } from "@/hooks/diagram-creation-hook";
import { ConvexReactClient, useConvex, useMutation } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useEffect, useState } from "react";
import { api } from "@/convex/_generated/api";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormSchema = z.object({
  title: z.string({
    required_error: "Please input a valid title.",
  }),
  description: z.optional(z.string()),
  databaseTypeId: z.string({
    required_error: "Please select a database type.",
  }),
});

const CreateDiagramModal = () => {
  const { isOpen, onClose } = useCreation();

  const client = useConvex();

  const create = useMutation(api.diagrams.create);

  const [databaseTypes, setDatabaseTypes] = useState<
    Doc<"databaseTypes">[] | null
  >(null);

  useEffect(() => {
    fetchDataFromDatabase(client)
      .then((data) => {
        setDatabaseTypes(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [client]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    var title = data.title;
    var description = data?.description;
    var databaseTypeId = data.databaseTypeId;
    try {
      const promise = create({
        title,
        description,
        databaseTypeId: databaseTypeId as Id<"databaseTypes">,
      });
      toast.promise(promise, {
        loading: "Creating a new diagram...",
        success: "Created a new diagram!",
        error: "Failed to create a new diagram...",
      });
      onClose();
    } catch (error) {
      console.error("Error creating diagram:", error);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Diagram</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Diagram title..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Diagram description..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <FormField
              control={form.control}
              name="databaseTypeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Database Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a database type." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {databaseTypes &&
                        databaseTypes.map((type) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.title}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create Diagram</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDiagramModal;

async function fetchDataFromDatabase(client: ConvexReactClient) {
  return await client.query(api.databaseTypes.getDatabaseTypes);
}
