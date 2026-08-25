"use client";
import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

interface ChildProps {
  pageName?: string;
}

const NavigationButtons = ({ pageName }: ChildProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div
      onClick={() => setIsMenuOpen(false)}
      className={`${
        isMenuOpen && "h-screen bg-black/40 md:bg-black/0"
      } flex justify-center w-full md:w-[25%] md:h-screen md:py-0 items-end fixed z-70 bottom-0 md:pb-0 md:translate-0 left-[50%] md:right-0 md:translate-x-1  md:left-auto -translate-x-[50%]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="transition-all md:py-16 md:rounded-none md:flex-col  duration-500 ease-in-out hover:text-white  flex-col justify-around items-center min-h-15 md:min-h-20 w-full  md:mb-0 "
      >
        <div
          className={` ${
            isMenuOpen ? "flex" : "hidden md:flex"
          } flex md:absolute md:bottom-0 md:justify-center md:right-0 md:border-b-0 md:border-t-1 border-task-lightGray h-30 w-full justify-center items-center`}
        >
          <div
            onClick={() => signOut()}
            className="flex bg-icon-gray mb-3 gap-2 justify-center h-11 w-28 rounded-[32px] text-black items-center cursor-pointer"
          >
            <FiLogOut className="text-lg" />
            <div>Log Out</div>
          </div>
        </div>

        <div className=" flex md:flex-col md:h-[50%] justify-around items-center md:justify-start md:py-5 h-14 w-full bg-background">
          {pageName == "homeee" && (
            <div
              onClick={() => router.back()}
              className="md:hidden flex justify-center items-center cursor-pointer w-9 h-9 md:h-ful rounded-[50%] hover:bg-black/50"
            >
              <GoArrowLeft className="text-lg text-task-darkWhite" />
            </div>
          )}
          <Link href="/">
            <div
              className={`flex justify-center hover:bg-black/50  md:mb-10 items-center md:w-40 w-[66px] h-[35px] ${pageName === "home" || "list" ? "bg-[#2A3C31]" : ""}  md:rounded-2xl rounded-[32px]`}
            >
              <div className="w-[20px] aspect-square">
                <Image
                  src={
                    pageName === "home" || "list"
                      ? "/icons/home-active.svg"
                      : "/icons/home-inactive.svg"
                  }
                  alt="home"
                  height={50}
                  width={50}
                  className="h-full"
                />
              </div>
              <div className="hidden md:block">Home</div>
            </div>
          </Link>
          <Link
            href={`/profile/${session?.user?.name?.replaceAll(" ", "-")}-${
              session?.user?.id
            }`}
          >
            <div
              className={`flex justify-center items-center md:w-40 md:rounded-2xl ${pageName === "profile" && "bg-[#2A3C31]"}  w-[66px] h-[35px] rounded-[32px] hover:bg-black/50`}
            >
              <div className="w-[20px] aspect-square">
                <Image
                  src={
                    pageName === "profile"
                      ? "/icons/profile-active.svg"
                      : "/icons/profile-inactive.svg"
                  }
                  alt="profile"
                  height={50}
                  width={50}
                  className="h-full"
                  draggable={false}
                />
              </div>
              <div className="hidden md:block">Profile</div>
            </div>
          </Link>

          <div
            onClick={() =>
              isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
            }
            className="md:hidden flex justify-center items-center cursor-pointer w-[66px] h-9 rounded-[32px] hover:bg-black/50"
          >
            {isMenuOpen ? (
              <IoMdClose className="text-lg text-task-darkWhite" />
            ) : (
              <div className="w-[20px] aspect-square">
                <Image
                  src={"/icons/menu.svg"}
                  alt="home"
                  height={50}
                  width={50}
                  className="h-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
