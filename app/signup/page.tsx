"use client";
import React from "react";
import { GoChecklist } from "react-icons/go";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <div className="h-15 w-full flex justify-center items-center bg-gradient-to-r from-green-800 via-green-600 to-green-500">
        <GoChecklist className="mx-2 text-2xl" />
        <div className="mx-2">TASK IT</div>
      </div>
      <div className="py-20 pb-40  px-[5%] flex flex-col justify-center items-left w-full h-screen ">
        <div className="h-15 mb-10 w-full flex justify-start items-center">
          <GoChecklist className="mr-2 text-3xl text-green-600" />
          <div className="mx-2">TASK IT</div>
        </div>
        <div>
          Do you have an account?
          <Link href="/login">
            <span className="text-blue-500 ml-2">Login</span>
          </Link>
        </div>

        <div className="mb-5 mt-1 text-white text-2xl">Sign up</div>
        <div className="before:content[''] before:border-1 before:flex before:w-[49%] before:border-gray-600 before:mr-3 after:content[''] after:border-[1px] after:ml-3 after:flex after:w-[49%] after:border-gray-600 w-full flex justify-center items-center">
          with
        </div>
        <a
          href="/api/auth/signin"
          className="flex my-2 mt-7 mx-auto justify-center items-center hover:rounded-[60px] w-full h-13 bg-white/10 rounded-xl border-white border-1 text-white"
        >
          <FaGoogle className="mr-3 text-lg" />
          <div className="">Google</div>
        </a>
      </div>
    </div>
  );
};

export default page;
