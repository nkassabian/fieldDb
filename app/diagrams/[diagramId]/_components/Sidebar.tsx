import { Button } from "@/components/ui/button";
import { usenodeCreation } from "@/hooks/table-creation-hook";
import { DatabaseZap, Grab, Import, LucideTable2 } from "lucide-react";

const Sidebar = ({ title }: { title: string }) => {
  // Corrected props destructuring
  const { onOpen } = usenodeCreation();
  return (
    <div className="align-center border-nuetral-200  flex h-screen  w-[350px] flex-col gap-y-2 border-r p-5">
      <h2 className="text-2xl font-bold">{title}</h2>
    </div>
  );
};

export default Sidebar;
