import { Button } from "@/components/ui/button";
import { usenodeCreation } from "@/hooks/table-creation-hook";
import { DatabaseZap, Grab, Import, LucideTable2 } from "lucide-react";

const Sidebar = ({}: {}) => {
  const { onOpen } = usenodeCreation();
  return (
    <div className="w-12 flex flex-col align-center  gap-y-2 border-r border-nuetral-200">
      <Button variant={"ghost"} className="p-3">
        <Grab className="w-10 h-10 text-muted-foreground" />
      </Button>
      <Button onClick={onOpen} variant={"ghost"} className="p-3">
        <LucideTable2 className="w-10 h-10 text-muted-foreground" />
      </Button>
      <Button variant={"ghost"} className="p-3">
        <DatabaseZap className="w-10 h-10 text-muted-foreground" />
      </Button>
      <Button variant={"ghost"} className="p-3">
        <Import className="w-10 h-10 text-muted-foreground" />
      </Button>
    </div>
  );
};

export default Sidebar;
