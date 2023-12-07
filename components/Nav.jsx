"use client";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import flexible from "/public/logo.svg";
import flexiblep from "/public/logo-purple.svg";
import Image from "next/image";
import { NavLinks } from "../app/constants";
import Auth from "./Auth";

import { useSession } from "next-auth/react";
import ProfileMenu from "./ProfileMenu";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Toaster } from "react-hot-toast";

const Nav = () => {
  const { data: session } = useSession();
  const [dark, setDark] = useState("");

  // Function to toggle the theme
  const toggleTheme = () => {
    setDark(!dark);
    const newTheme = dark ? "light" : "dark";
    // Update localStorage with the new theme preference
    localStorage.setItem("theme", newTheme);
  };

  useLayoutEffect(() => {
    setDark(() => {
      const savedTheme = window.localStorage.getItem("theme");
      return savedTheme === "dark" ? true : false;
    });

    const checkMedia = (e) => {
      if (!e.matches || !dark) {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    };

    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    checkMedia(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener("change", checkMedia);

    // Remove the event listener when the component unmounts
    return () => {
      darkModeMediaQuery.removeEventListener("change", checkMedia);
    };
  }, [dark]);

  return (
    <>
      <nav
        className="fixed group/main max-md:pt-7 border-b items-center 
         dark:border-none border-white max-md:text-3xl   bg-opacity-20 backdrop-blur-sm 
   w-full max-md:px-8  px-16 top-0 left-0 z-20 flex justify-between pt-5  py-4"
      >
      
        <Link href="/" className=" dark:hidden min-w-[100px] !text-gray-700">
          <Image height={30} width={90} src={flexible} alt="logo" />
        </Link>
        <Link
          href="/"
          className=" min-w-[100px] hidden dark:flex !text-gray-700"
        >
          <Image height={30} width={90} src={flexiblep} alt="logo" />
        </Link>

        <ul className="hidden items-end xl:flex  gap-4 my-2">
          {NavLinks.map((e) => (
            <li key={e.key}>
              <Link
                className="flex items-center text-lg overflow-hidden  whitespace-nowrap group h-10 hover:text-violet-500 transition  relative"
                href={e.href}
              >
                {" "}
                {e.text}
                <div className="absolute h-1 -bottom-0 w-full transition-all   -left-full group-hover:left-0 bg-violet-600 ">
                  {" "}
                </div>{" "}
              </Link>{" "}
            </li>
          ))}
        </ul>
        <button
          className=" max-sm:text-xl h-12 p-1 pl-2 items-center dark:bg-light-white-500 max-sm:h-9 
        bg-[#252531] rounded-full max-sm:min-w-[4.5rem] text-3xl min-w-[6rem] "
          onClick={() => toggleTheme()}
        >
          <div
            style={{
              translate: dark ? "170% 0 " : "0px 0",
              rotate: dark ? "z 360deg" : "z 0deg",
            }}
            className=" duration-500  w-fit origin-center transition-all "
          >
            {dark ? (
              <BsFillMoonFill className=" text-blue-900    " />
            ) : (
              <BsFillSunFill className=" text-yellow-500 " />
            )}{" "}
          </div>
        </button>
        <div className="flex  flex-wrap justify-end gap-4">
          {session ? (
            <ProfileMenu session={session} />
          ) : (
            <>
              <Auth />
            </>
          )}
        </div>
      </nav>
      <Toaster />{" "}
    </>
  );
};

export default Nav;
