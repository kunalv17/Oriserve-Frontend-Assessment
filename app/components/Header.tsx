"use client";

import React from "react";
import Searchbar from "./Searchbar";
import { useSearchContext } from "../context/SearchContect";

export default function Header() {
  const { setSearchTerm } = useSearchContext();
  return (
    <div className="fixed top-0 w-full p-4 bg-black/80 backdrop-blur-sm flex-col flex sm:flex-row items-center justify-center gap-4 sm:gap-12">
      <h1
        className="text-white text-4xl font-bold text-center cursor-pointer"
        onClick={() => setSearchTerm("")}
      >
        <span className="text-yellow-500">Search</span> Photos
      </h1>
      <div className="flex items-center justify-center h-full">
        <Searchbar />
      </div>
    </div>
  );
}
