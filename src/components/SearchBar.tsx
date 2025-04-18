
import React from "react";
import { SearchIcon } from "lucide-react";
import { useMusic } from "@/context/MusicContext";

const SearchBar: React.FC = () => {
  const { setSearch } = useMusic();
  
  return (
    <div className="relative w-full max-w-md">
      <SearchIcon 
        size={16} 
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
      />
      <input
        type="search"
        placeholder="Search Song, Artist"
        className="w-full bg-secondary pl-10 pr-4 py-2 rounded-full text-sm text-white placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent/50"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
