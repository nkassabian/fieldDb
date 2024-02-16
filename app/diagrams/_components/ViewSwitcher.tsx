import { DiagramStore } from "@/hooks/DiagramStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayoutDashboardIcon, ListIcon } from "lucide-react";

const ViewSwitcher = () => {
  const { viewType, setViewType } = DiagramStore();

  return (
    <Tabs defaultValue={viewType}>
      <TabsList>
        <TabsTrigger
          className="flex flex-row gap-2"
          onClick={() => setViewType("card")}
          value="card"
        >
          <LayoutDashboardIcon className="h-4 w-4" />
          Card View
        </TabsTrigger>
        <TabsTrigger
          value="list"
          className="flex flex-row gap-2"
          onClick={() => setViewType("list")}
        >
          <ListIcon className="h-4 w-4" /> List View
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ViewSwitcher;
