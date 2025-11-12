"use client";
import React from "react";
import { GoChecklist } from "react-icons/go";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";

const page = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center">
      <div className="flex flex-col md:border-1 nx:border-1 justify-center w-full h-[60dvh] items-center nx:bg-task-selectColor/70 nx:rounded-3xl nx:w-130 nx:aspect-square nx:h-[70dvh]  ">
        <div className="shrink-0 z-20 mt-0 nx:mt-5 aspect-square  w-[70%] nx:w-[40%] rounded-full mx-auto wave- text-white flex justify-center items-center bg-gradient-to-br from-green-400 to-green-600">
          <GoChecklist className=" mx-2 text-4xl" />
          <div className=" mx-2 text-xl">TASK IT</div>
        </div>
        <div className="py-0 my-5 rounded-tl-xl rounded-tr-xl pb-0 px-[5%] flex flex-col justify-center items-center w-full h-[49%] md:h-[40%]">
          <div className="h-18 mb-5 w-full flex flex-col px-6 justify-center items-center">
            <h1 className="mx-2 text-2xl mb-2 mt-5 nx:mt-0">Hello</h1>
            <p className="text-center nx:text-task-darkWhite text-sm text-green-200 flex w-60">
              Create your To-do list with items which you can track progress
            </p>
          </div>

          <div
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="flex my-2 transition-all duration-800 nx:hover:rounded-4xl nx:hover:bg-white/10 nx:hover:text-white 1s ease-in-out nx:text-black mt-6 nx:bg-white nx:rounded-xl hover:bg-white hover:text-black mx-auto justify-center items-center rounded-[42px] w-full shrink-0 nx:w-90 cursor-pointer h-15 nx:h-13 bg-white/10  border-white border-1 text-white"
          >
            <FaGoogle className="mr-3 transition-all 1s ease-in text-lg" />
            <div className="transition-all 1s ease-in">Google</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
