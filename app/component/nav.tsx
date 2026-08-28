import React from "react";
import { getSession } from "@/libs/session";
import { GoChecklist } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { headers } from "next/headers";
import Image from "next/image";

interface ChildProps {
  name?: string;
}

const Nav = async ({ name }: ChildProps) => {
  const headerList = headers();
  const referer = (await headerList).get("referer");
  const session = await getSession();

  console.log(session?.user?.avatar);

  return (
    <>
      <nav
        className={`z-20 fixed md:px-[128px] backdrop-blur-md px-[20px]  flex justify-between items-center w-full  h-[64px]  bg-background md:h-[68px] top-0 border-task-darkerWhite`}
      >
        {name === "profile" && referer && (
          <Link href={referer}>
            <div className="flex justify-start items-center cursor-pointer w-9 h-9 shrink-0 rounded-[50%] hover:bg-black/50 mr-2">
              <GoArrowLeft className="text-xl text-task-darkWhite" />
            </div>
          </Link>
        )}

        <Link
          href={`/profile/${session?.user?.name?.replaceAll(" ", "-")}-${
            session?.user?.id
          }`}
          className="flex w-[60%] justify-start"
        >
          <div
            className={`flex shrink-0 ${
              name === "profile" && "hidden"
            } cursor-pointer items-center justify-start `}
          >
            <div className="flex shrink-0 overflow-hidden justify-center items-center w-10 aspect-square rounded-full bg-background mr-4">
              <div className="w-full aspect-square">
                <Image
                  src={session?.user?.avatar || ""}
                  height={50}
                  width={50}
                  alt="user image"
                  draggable={false}
                  className="w-full"
                />
              </div>
            </div>

            <div className="text-[16px] font-semibold mr-1 text-shadow-task-darkWhite">
              {session?.user?.name?.split(" ")[0]}
            </div>
            <div className="text-[16px] text-shadow-task-darkWhite">
              {session?.user?.name?.split(" ")[1]}
            </div>
          </div>
        </Link>
        <Link href={"/"} className="flex w-[40%] justify-start">
          <div className="flex shrink-0 items-center justify-end w-full">
            <GoChecklist className="text-2xl hidden mr-3" />
            <div className="text-[18px] cursor-pointer">Task It</div>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default Nav;
