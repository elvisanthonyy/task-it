"use client";
import React, { useState } from "react";
import { GoArrowLeft, GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { signOut, useSession } from "next-auth/react";

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
      } flex justify-center w-full md:w-[25%] md:h-screen md:py-0 items-end fixed z-70 bottom-0 pb-5 md:pb-0 md:translate-0 left-[50%] md:right-0 md:translate-x-1  md:left-auto -translate-x-[50%]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-sm transition-all md:h-full md:w-full nx:w-[60%] md:border-0 md:border-l-1 md:py-16 md:rounded-none md:flex-col  duration-500 ease-in-out hover:text-white  flex-col justify-around items-center border-1 border-task-darkerWhite backdrop-blur-lg md:shadow-none shadow-2xl  min-h-15 md:min-h-20 w-[90%]  md:mb-0 bg-task-white/10 rounded-4xl"
      >
        <div
          className={` ${
            isMenuOpen ? "flex" : "hidden md:flex"
          } flex border-b-1 md:absolute md:bottom-0 md:justify-center md:right-0 md:border-b-0 md:border-t-1 border-task-lightGray h-30 w-full justify-center items-center`}
        >
          <div
            onClick={() => signOut()}
            className="flex items-center cursor-pointer"
          >
            <FiLogOut className="text-lg mr-2" />
            <div>Log Out</div>
          </div>
        </div>

        <div className=" flex md:flex-col md:h-[50%] justify-around items-center md:justify-start md:py-5 h-14 w-full bg-task-white/10">
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
              className={`flex justify-center  md:mb-10 items-center md:w-40 w-11 h-11 md:rounded-2xl rounded-[50%] hover:bg-black/50`}
            >
              <GoHomeFill
                className={`hover:text-white md:mr-3 ${
                  pageName === "home"
                    ? "text-2xl text-white"
                    : " text-lg text-task-darkWhite"
                }`}
              />
              <div className="hidden md:block">Home</div>
            </div>
          </Link>
          <Link
            href={`/profile/${session?.user?.name?.replaceAll(" ", "-")}-${
              session?.user?.id
            }`}
          >
            <div
              className={`flex justify-center items-center md:w-40 md:rounded-2xl  w-11 h-11 rounded-[50%] hover:bg-black/50`}
            >
              <FaUser
                className={`hover:text-white md:mr-3 ${
                  pageName === "profile"
                    ? "text-white text-xl"
                    : "text-task-darkWhite text-[15px]"
                }`}
              />
              <div className="hidden md:block">Profile</div>
            </div>
          </Link>

          <div
            onClick={() =>
              isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
            }
            className="md:hidden flex justify-center items-center cursor-pointer w-9 h-9 rounded-[50%] hover:bg-black/50"
          >
            {isMenuOpen ? (
              <IoMdClose className="text-lg text-task-darkWhite" />
            ) : (
              <HiDotsHorizontal className="text-lg text-task-darkWhite" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationButtons;
