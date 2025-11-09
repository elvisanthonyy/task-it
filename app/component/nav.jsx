import React from "react";
import { getSession } from "@/libs/session";
import { GoChecklist } from "react-icons/go";
import { FaUser } from "react-icons/fa";
import Link from "next/link";

const nav = async () => {
  const session = await getSession();
  return (
    <>
      <nav className="z-20 backdrop-blur-md px-[5%] flex justify-between border-b-1 items-center w-full h-20 absolute top-0 border-b-gray-500">
        <Link
          href={`profile/${session.user.name} ${session.user.id}`}
          className="flex w-[60%] justify-start"
        >
          <div className="flex shrink-0  cursor-pointer items-center justify-start ">
            <div className="flex justify-center items-center w-7 h-7 rounded-full bg-purple-600 mr-4">
              <FaUser className="text-md" />
            </div>

            <div className="text-md font-semibold mr-2 text-shadow-task-darkWhite">
              {session?.user?.name.split(" ")[0]}
            </div>
            <div className="text-md text-shadow-task-darkWhite">
              {session?.user?.name.split(" ")[1]}
            </div>
          </div>
        </Link>
        <div className="flex items-center justify-end w-[40%]">
          <GoChecklist className="text-2xl mr-3" />
          <div className="text-md cursor-pointer">Task It</div>
        </div>
      </nav>
    </>
  );
};

export default nav;
