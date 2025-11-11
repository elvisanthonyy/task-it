import React from "react";
import { getSession } from "@/libs/session";
import { GoChecklist } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";
import { headers } from "next/headers";

interface ChildProps {
  name?: string;
}

const nav = async ({ name }: ChildProps) => {
  const headerList = headers();
  const referer = (await headerList).get("referer");
  const session = await getSession();

  return (
    <>
      <nav className="z-20 backdrop-blur-md px-[5%] flex justify-between  items-center w-full h-20 absolute top-0 border-task-darkerWhite">
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
            <div className="flex shrink-0 justify-center items-center w-9 h-9 rounded-full bg-purple-600 mr-4">
              <FaUser className="text-md" />
            </div>

            <div className="text-lg font-semibold mr-2 text-shadow-task-darkWhite">
              {session?.user?.name?.split(" ")[0]}
            </div>
            <div className="text-lg text-shadow-task-darkWhite">
              {session?.user?.name?.split(" ")[1]}
            </div>
          </div>
        </Link>
        <Link href={"/"} className="flex w-[40%] justify-start">
          <div className="flex shrink-0 items-center justify-end w-full">
            <GoChecklist className="text-3xl mr-3" />
            <div className="text-lg cursor-pointer">Task It</div>
          </div>
        </Link>
      </nav>
    </>
  );
};

export default nav;
