"use client";
import React, { useState } from "react";
import { GoArrowLeft, GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { signOut } from "next-auth/react";

interface ChildProps {
  pageName?: string;
}

const NavigationButtons = ({ pageName }: ChildProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div
      onClick={() => setIsMenuOpen(false)}
      className={`${
        isMenuOpen && "h-screen bg-black/40"
      } flex justify-center w-full items-end fixed z-70 bottom-0 pb-5 left-[50%] -translate-x-[50%]`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="text-sm transition-all duration-500 ease-in-out hover:text-white  flex-col justify-around items-center border-1 border-task-darkerWhite backdrop-blur-lg shadow-2xl  min-h-15 w-[90%] bg-task-white/10 rounded-4xl"
      >
        {isMenuOpen && (
          <div className="flex border-b-1 border-b-task-lightGray h-30 w-full justify-center items-center">
            <div
              onClick={() => signOut()}
              className="flex items-center cursor-pointer"
            >
              <FiLogOut className="text-lg mr-2" />
              <div>Log Out</div>
            </div>
          </div>
        )}

        <div className=" flex justify-around items-center shadow-2xl  h-14 w-full bg-task-white/10">
          {pageName !== "home" && (
            <div
              onClick={() => router.back()}
              className="flex justify-center items-center cursor-pointer w-9 h-9 rounded-[50%] hover:bg-black/50"
            >
              <GoArrowLeft className="text-lg text-task-darkWhite" />
            </div>
          )}
          <div
            className={`flex justify-center items-center  w-11 h-11 rounded-[50%] hover:bg-black/50`}
          >
            <FaUser
              className={`hover:text-white ${
                pageName === "profile"
                  ? "text-white text-xl"
                  : "text-task-darkWhite text-[15px]"
              }`}
            />
          </div>
          <Link href="/">
            <div
              className={`flex justify-center items-center w-11 h-11 rounded-[50%] hover:bg-black/50`}
            >
              <GoHomeFill
                className={`hover:text-white ${
                  pageName === "home"
                    ? "text-2xl text-white"
                    : " text-lg text-task-darkWhite"
                }`}
              />
            </div>
          </Link>
          <div
            onClick={() =>
              isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
            }
            className="flex justify-center items-center cursor-pointer w-9 h-9 rounded-[50%] hover:bg-black/50"
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
