"use client";
import React from "react";
import { GoChecklist } from "react-icons/go";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";

const page = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen">
      <div className="mt-23 shrink-0 z-20 h-65 w-65 rounded-full mx-auto wave- text-white flex justify-center items-center bg-gradient-to-br from-green-400 to-green-600">
        <GoChecklist className=" mx-2 text-4xl" />
        <div className=" mx-2 text-xl">TASK IT</div>
      </div>
      <div className="py-10 rounded-tl-xl rounded-tr-xl bg-mainBackground pb-40 px-[5%] flex flex-col justify-center items-center w-full h-screen ">
        <div className="h-18 mb-5 w-full flex flex-col px-6 justify-center items-center">
          <h1 className="mx-2 text-2xl mb-2">Hello</h1>
          <p className="text-center text-sm text-green-200">
            Create you To-do list with items which you can track progress
          </p>
        </div>

        <div>
          Don't have an account?
          <Link href="/signup">
            <span className="text-blue-500 ml-3">Sign Up</span>
          </Link>
        </div>

        <div
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex my-2 transition-all 1s ease-in-out hover:bg-white hover:text-black mt-10 mx-auto justify-center items-center rounded-[42px] w-full h-13 bg-white/10  border-white border-1 text-white"
        >
          <FaGoogle className="mr-3 transition-all 1s ease-in text-lg" />
          <div className="transition-all 1s ease-in">Google</div>
        </div>
      </div>
    </div>
  );
};

export default page;
