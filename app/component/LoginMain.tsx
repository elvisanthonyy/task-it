"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const LoginMain = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/login";
  console.log(callbackUrl);
  return (
    <main className="flex w-full md:bg-[url('/extras/background-ball-desktop.svg')] bg-[url('/extras/background-balls.png')] bg-no-repeat bg-fixed bg-cover h-screen justify-center items-center">
      <div className="flex gap-8 py-6 md:border border-t border-b border-[#616161] bg-[#2E2E2E] md:rounded-[44px] flex-col md:h-[416px] md:w-[468px] justify-center w-full items-center">
        <div className="w-full md:items-center px-4 gap-4 flex flex-col">
          <div className="flex gap-3 items-center">
            <div className="p-4 border items-center border-[#616161] bg-icon-gray rounded-full">
              <div className="w-[16px] aspect-square">
                <Image
                  height={50}
                  width={50}
                  alt="google icon"
                  src={"/icons/task-it-logo.svg"}
                  className="w-full text-black"
                />
              </div>
            </div>
            <h1 className="text-[18px] text-text-gray">TASK-IT</h1>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3 md:w-[70%]">
          <h1 className=" mx-2 px-3 md:text-center tracking-tight text-[18px] font-light">
            Log in to your account
          </h1>
          <p className="text-left md:bg-[#292929] md:border-[#505050] md:rounded-[8px] md:borderr md:text-center md:py-4 w-full text-deeper-text text-[14px] pl-5 pr-12 md:px-[20%]">
            Create your to-do list and mamange and track progress
          </p>
        </div>
        <div className="py-0 rounded-tl-xl rounded-tr-xl pb-0 px-[5%] flex flex-col justify-center items-center w-full">
          <div
            onClick={() => signIn("google", { callbackUrl })}
            className="flex gap-2 transition-all duration-800 nx:hover:rounded-4xl ease-in-out hover:bg-white hover:text-black mx-auto justify-center items-center rounded-[42px] w-full shrink-0 nx:w-90 cursor-pointer h-[56px] mt-2 md:mt-4 bg-white text-black  border-white border-1"
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
            <div className="transition-all font-medium 1s ease-in text-[#484848]">
              Google
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginMain;
