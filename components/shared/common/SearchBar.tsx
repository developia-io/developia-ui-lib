import React, { useState } from 'react';
import clsx from 'clsx';

export type SearchProps = {
  radius?: "rounded" | "square";
};

const Search: React.FC<SearchProps> = ({ radius = "rounded" }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    console.log('Arama sorgusu:', query);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Ara..."
        className={clsx(
          "px-4 py-2 border border-neutral_30 focus:outline-none focus:ring-2 focus:ring--primary_50",
          {
            "rounded-md": radius === "rounded",
            "rounded-none": radius === "square",
          }
        )}
      />
      <button
        onClick={handleSearch}
        className={clsx(
          "px-4 py-2 bg-primary_50 text-white hover:bg-primary_60 focus:outline-none focus:ring-2 focus:ring-primary_50",
          {
            "rounded-md": radius === "rounded",
            "rounded-none": radius === "square",
          }
        )}
      >
        Ara
      </button>
    </div>
  );
};

export default Search;
