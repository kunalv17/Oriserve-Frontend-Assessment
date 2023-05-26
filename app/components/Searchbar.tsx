"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, PrevIcon } from "./icons";
import { useForm } from "react-hook-form";
import { useSearchContext } from "../context/SearchContect";

function Searchbar() {
  const [isPrevSearchModalOpen, setIsPrevSearchModalOpen] =
    useState<boolean>(false);
  const [prevSearch, setPrevSearch] = useState<string[]>([]);

  const { searchTerm, setSearchTerm, clearSearchTerm } = useSearchContext();
  const { register, handleSubmit, setValue, watch } = useForm();

  const onSubmit = (data: any) => {
    setPrevSearch((prev) => [
      data.searchText,
      ...prev.filter(
        (currentData, index) => index < 3 && data.searchText !== currentData
      ),
    ]);
    setValue("searchText", "", { shouldValidate: true });
    localStorage.setItem(
      "search",
      JSON.stringify(prevSearch.concat(data.searchText))
    );
    setSearchTerm(data.searchText);
  };

  useEffect(() => {
    const search = localStorage.getItem("search");
    if (search) {
      setPrevSearch(JSON.parse(search));
    }
  }, []);

  useEffect(() => {
    if (watch("searchText") === "") {
      setIsPrevSearchModalOpen(false);
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsPrevSearchModalOpen, watch, watch("searchText")]);

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            value={watch("searchText") || ""}
            {...register("searchText", { required: true })}
            className="block sm:w-96 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
            autoComplete="off"
            onFocus={() => setIsPrevSearchModalOpen(true)}
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>
      {isPrevSearchModalOpen && prevSearch.length > 0 && (
        <div className="sm:w-96 w-full bg-white rounded-lg absolute">
          <div className="relative">
            <div>
              {prevSearch.map((item, index) => (
                <div
                  key={index}
                  className={`px-4 hover:bg-gray-200 p-2 ${
                    index === 0 && "rounded-t-lg"
                  }`}
                  onClick={() => {
                    setValue("searchText", item, { shouldValidate: true });
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>{item}</div>
                    <div>
                      <PrevIcon className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-14">
              <button
                onClick={() => {
                  setIsPrevSearchModalOpen(false);
                }}
                className="m-2 p-2 absolute right-20 bottom-0 justify-self-end px-4 bg-gray-500 text-white rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setPrevSearch([]);
                  localStorage.setItem("search", JSON.stringify([]));
                }}
                className="m-2 p-2 absolute right-0 bottom-0 justify-self-end px-4 bg-rose-500 text-white rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Searchbar;
