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
      <nav className="z-20 backdrop-blur-md px-[5%] flex justify-between border-b-1 items-center w-full h-20 absolute top-0 border-task-darkerWhite">
        {name === "profile" && referer && (
          <Link href={referer}>
            <div className="flex justify-center items-center cursor-pointer w-9 h-9 rounded-[50%] hover:bg-black/50">
              <GoArrowLeft className="text-lg text-task-darkWhite" />
            </div>
          </Link>
        )}

        <Link
          href={`/profile/${session?.user?.name?.replaceAll(" ", "-")}-${
            session?.user?.id
          }`}
          className="flex w-[60%] justify-start"
        >
          <div className="flex shrink-0  cursor-pointer items-center justify-start ">
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

        <div className="flex items-center justify-end w-[40%]">
          <GoChecklist className="text-3xl mr-3" />
          <div className="text-lg cursor-pointer">Task It</div>
        </div>
      </nav>
    </>
  );
};

export default nav;
