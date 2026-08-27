"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/prof";
  console.log(callbackUrl);
  return (
    <main className="flex w-full md:bg-[url('/extras/background-ball-desktop.svg')] bg-[url('/extras/background-balls.png')] bg-no-repeat bg-fixed bg-cover h-screen justify-center items-center">
      <div className="flex gap-6 md:border md:border-[#616161] md:bg-[#2E2E2E] md:rounded-[64px] flex-col md:h-[467px] md:w-[498px] justify-center w-full items-center">
        <div>
          <h1 className=" mx-2 text-xl">TASK IT</h1>
        </div>
        <div className="text-center w-full md:w-[70%]">
          <p className="text-center md:bg-white/0 border-[#828282] bg-background py-4 w-full border-t border-b text-[#B2B2B2] text-[14px] px-[20%]">
            Create your to-do list and mamange and track progress
          </p>
        </div>
        <div className="py-0 rounded-tl-xl rounded-tr-xl pb-0 px-[5%] flex flex-col justify-center items-center w-full">
          <div
            onClick={() => signIn("google", { callbackUrl })}
            className="flex gap-2 transition-all duration-800 nx:hover:rounded-4xl ease-in-out hover:bg-white hover:text-black mx-auto justify-center items-center rounded-[42px] w-full shrink-0 nx:w-90 cursor-pointer h-[56px] bg-white text-black  border-white border-1"
          >
            <div className="h-5 aspect-square">
              <Image
                height={50}
                width={50}
                alt="google icon"
                src={"/icons/google-icon.svg"}
                className="w-full"
              />
            </div>
            <div className="transition-all 1s ease-in text-[#484848]">
              Google
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
