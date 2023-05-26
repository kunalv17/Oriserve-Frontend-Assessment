"use client"

import Image from "next/image";
import { Photo } from "../types";
import { useState } from "react";

interface CardProps {
  photoDetails: Photo;
}

const Card: React.FC<CardProps> = ({ photoDetails }) => {

  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed ease-in-out duration-1000 flex justify-center items-center inset-0 z-10 h-full w-full bg-gray-900/80 backdrop-blur-sm"
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <div className="p-2">
            <Image
              alt="photo"
              width={500}
              height={500}
              className="rounded-lg"
              src={`https://farm${photoDetails.farm}.staticflickr.com/${photoDetails.server}/${photoDetails.id}_${photoDetails.secret}_n.jpg`}
            />
          </div>
        </div>
      )}
      <div
        className="flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <Image
          alt="photo"
          width={500}
          height={500}
          className="rounded-lg"
          src={`https://farm${photoDetails.farm}.staticflickr.com/${photoDetails.server}/${photoDetails.id}_${photoDetails.secret}_n.jpg`}
        />
      </div>
    </>
  );
};

export default Card;
