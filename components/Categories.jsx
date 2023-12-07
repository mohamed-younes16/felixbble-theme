"use client";
import { categoryFilters } from "/app/constants";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
  const router = useRouter();
  const path = useSearchParams();

  return (
    <>
      <div
        className=" select-none flex gap-2 px-1  py-8 md:pb-10 dark:max-sm:pt-12 
        max-sm:mb-16 
        backdrop-blur-sm  relative  items-center mt-1 w-full  categories 
        max-[1633px]:overflow-x-auto overflow-x-hidden overflow-y-hidden"
      >
        {categoryFilters.map((e) => (
          <button
            onClick={() => router.push(`/?categorie=${e}`)}
            key={e}
            className={`${path.get("categorie") == e ? "!bg-purple-800" : ""} 
            relative hover:bg-black hover:text-white  dark:hover:text-black
            mx-auto transition-all bg-white dark:bg-neutral-700  dark:hover:bg-neutral-300  rounded-lg p-2 text-xl font-semibold  whitespace-nowrap  `}
          >
            {" "}
            {e}{" "}
          </button>
        ))}
      </div>
    </>
  );
};

export default Categories;
