import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useDiagramInfo } from "@/hooks/diagram-information-hook";
import Link from "next/link";
import { TrashIcon } from "lucide-react";
import DeleteTableModal from "./DeleteTableModal";
import { formatDateToCustomFormat } from "@/lib/utils";
import { Separator } from "../ui/separator";

const DigramInfoModal = () => {
  const { isOpen, onClose, diagramId } = useDiagramInfo();

  const diagram = useQuery(api.diagrams.getByIdInfo, {
    diagramId: diagramId,
  });

  return (
    <Dialog onOpenChange={onClose} open={isOpen}>
      {diagram && (
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{diagram.title}</DialogTitle>
            <DialogDescription>
              {diagram.description ? diagram.description : "No description"}
            </DialogDescription>
          </DialogHeader>
          <div className="my-4 flex flex-row gap-10">
            <div>
              <p className="font-bold">Database Type:</p>
              <p>{diagram.lang.databaseLang}</p>
            </div>
            <Separator orientation="vertical" />
            <div>
              <p className="font-bold">Created On:</p>
              <p>{formatDateToCustomFormat(new Date(diagram._creationTime))}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant={"destructive"} className="gap-2">
              <TrashIcon className="h-4 w-4" />
              Delete
            </Button>
            <Link href={`/diagrams/${diagram._id}`}>
              <Button variant="default">Open Diagram</Button>
            </Link>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default DigramInfoModal;
