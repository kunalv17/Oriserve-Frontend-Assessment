"use client"

import React, { createContext, useContext, useState } from "react";

interface SearchContextValue {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  clearSearchTerm: () => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function useSearchContext(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
}

interface SearchProviderProps {
  children: React.ReactNode;
}

export function SearchProvider({ children }: SearchProviderProps): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");

  const clearSearchTerm = () => {
    setSearchTerm("");
  };

  const value: SearchContextValue = {
    searchTerm,
    setSearchTerm,
    clearSearchTerm,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
