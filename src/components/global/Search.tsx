import React, { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  onSearch?: (query: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-center bg-bg rounded-full shadow px-4 py-2 w-56 border border-border-first "
    >
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search here"
        className="bg-transparent outline-none w-full pr-8 text-sm"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
      >
        <SearchIcon size={18} />
      </button>
    </form>
  );
};

export default Search;
