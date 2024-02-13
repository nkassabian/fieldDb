import { useState, useEffect, SetStateAction } from "react";
import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useConvex, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { DiagramStore } from "@/hooks/DiagramStore";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { setDiagrams } = DiagramStore();

  // Fetch diagrams based on search term
  const diagrams = useQuery(api.diagrams.getDiagrams, {
    searchQ: searchTerm,
  });

  const allDiagrams = useQuery(api.diagrams.getDiagrams, {});

  useEffect(() => {
    if (searchTerm !== "") {
      setDiagrams(diagrams || undefined);
    } else {
      setDiagrams(allDiagrams || undefined);
    }
  }, [diagrams, allDiagrams, setDiagrams, searchTerm]);

  const handleSearchTermChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-[275px] p-4 backdrop-blur">
      <form>
        <div className="relative">
          <SearchIcon className="text-muted-foreground absolute left-2 top-2.5 h-4 w-4" />
          <Input
            placeholder="Search"
            className="pl-8"
            value={searchTerm}
            onChange={handleSearchTermChange}
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
