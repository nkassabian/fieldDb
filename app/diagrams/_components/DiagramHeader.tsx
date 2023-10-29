import { Button } from "@/components/ui/button";
import { useCreation } from "@/hooks/diagram-creation-hook";
import { useUser } from "@clerk/nextjs";

const DiagramHeader = () => {
  const { user } = useUser();
  const { onOpen } = useCreation();
  return (
    <div className="flex flex-row justify-between items-center pb-10">
      <h1 className="font-bold text-2xl">{user?.fullName}&apos;s Diagrams</h1>
      <Button onClick={onOpen}>Add New Diagram</Button>
    </div>
  );
};

export default DiagramHeader;
