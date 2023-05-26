"use client";

import React, { useEffect, useState } from "react";
import flickrServicesInstance from "@/services/flickr.service";
import { ResponseData, Photo } from "../types";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "./Card";
import Spinner from "./Spinner";
import { useSearchContext } from "../context/SearchContect";

function Body() {
  const [initialPhotos, setInitialPhotos] = useState<Photo[]>([]);
  const [pageNumber, setPageNumber] = useState(2);

  const { searchTerm } = useSearchContext();

  useEffect(() => {
    async function fetchInitialPhotos() {
      try {
        const initialPhotos: ResponseData =
          await flickrServicesInstance.getInitialPhotos(1);
        setInitialPhotos(initialPhotos?.photos?.photo);
      } catch (error) {
        console.error("Error fetching initial photos:", error);
      }
    }

    fetchInitialPhotos();
  }, []);

  async function fetchMorePhotos(page: number) {
    if (searchTerm === "" || searchTerm === undefined || searchTerm === null) {
      try {
        const data: ResponseData =
          await flickrServicesInstance.getInitialPhotos(page);

        setInitialPhotos((prev) => [...prev, ...data?.photos?.photo]);
        setPageNumber(initialPhotos.length / 20 + 1);
      } catch (error: any) {
        throw new Error(error);
      }
    } else if (
      searchTerm !== "" ||
      searchTerm !== undefined ||
      searchTerm !== null
    ) {
      try {
        const data: ResponseData = await flickrServicesInstance.getPhotos(
          searchTerm,
          pageNumber
        );
        setInitialPhotos((prev) => [...prev, ...data?.photos?.photo]);
        setPageNumber(initialPhotos.length / 20 + 1);
      } catch (error: any) {
        throw new Error(error);
      }
    }
  }

  useEffect(() => {
    if (searchTerm === "" || (searchTerm === undefined && searchTerm === null))
      return;
    async function fetchPhotos() {
      try {
        const data: ResponseData = await flickrServicesInstance.getPhotos(
          searchTerm,
          1
        );
        setInitialPhotos(data?.photos?.photo);
      } catch (error: any) {
        throw new Error(error);
      }
    }
    fetchPhotos();
  }, [searchTerm]);

  return (
    <div className="mt-40 sm:mt-32 lg:mt-24 px-4">
      <InfiniteScroll
        className="flex flex-wrap justify-between w-full scroll-smooth"
        dataLength={initialPhotos.length}
        next={() => {
          fetchMorePhotos(pageNumber);
        }}
        hasMore={500 / 20 > pageNumber}
        loader={
          <div className="flex justify-center w-full h-12">
            <Spinner />
          </div>
        }
        endMessage={
          <p className="w-full flex justify-center">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {initialPhotos?.map((photo, index) => (
          <div className="p-2 sm:w-1/2 lg:w-1/3" key={photo?.id + index}>
            <Card photoDetails={photo} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Body;
