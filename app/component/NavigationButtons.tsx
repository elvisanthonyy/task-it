"use client";
import React from "react";
import { GoArrowLeft, GoHomeFill } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ChildProps {
  pageName?: string;
}

const NavigationButtons = ({ pageName }: ChildProps) => {
  const router = useRouter();
  return (
    <div className="text-sm hover:text-white fixed flex justify-around items-center bottom-[2%] left-[50%] -translate-x-[50%] border-1 border-task-lightGray backdrop-blur-lg shadow-2xl  h-14 w-[90%] bg-task-white/10 rounded-4xl">
      <div
        onClick={() => router.back()}
        className="flex justify-center items-center cursor-pointer w-9 h-9 rounded-[50%] hover:bg-black/50"
      >
        <GoArrowLeft className="text-lg text-task-darkWhite" />
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
    </div>
  );
};

export default NavigationButtons;
