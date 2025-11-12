import React from "react";
import Nav from "../../component/nav";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt, FaRegEnvelope } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { HiCheckBadge } from "react-icons/hi2";

const page = async () => {
  const session = await getSession();
  const cookieHeader = (await cookies()).toString();
  const basesURL = process.env.BASE_URL;
  if (!session) return redirect("login");

  const res = await fetch(`${basesURL}/api/user/get`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  const data = await res.json();

  return (
    <div className="relative pt-25 top-0 left-0 h-[100dvh] ">
      <Nav name="profile" />
      <div className="flex justify-start md:flex-row md:justify-start md:items-center md:px-[6%] h-[70dvh] flex-col w-full px-[6%]">
        <div className="flex mt-7 md:mt-0 mx-auto md:mx-0 border-3 md:mr-30 border-t-blue-600 border-b-blue-600 justify-center items-center w-[50%] md:w-[35%] aspect-square bg-purple-500 rounded-full">
          <FaUser className="text-6xl text-task-darkWhite" />
        </div>
        <div className="h-90 mt-10 border-task-darkerWhite md:mt-0 md:h-fit border-t-1 md:py-7 border-b-1 pb-5  md:justify-center justify-start flex  md:w-[40%] flex-col">
          <div className="relative flex h-15 w-full md:mt-0 mt-10 items-start">
            <div className="flex h-full items-start mt-2 mr-4">
              <FaUser className=" text-lg text-task-lightGray" />
            </div>
            <div className="flex h-full justify-start flex-col mr-6">
              <div className="text-lg text-task-darkWhite">
                {data?.user?.name}
              </div>
              <div className="text-task-lightGray text-sm">User Name</div>
            </div>
            <div className="absolute top-1 right-0 h-full flex items-start">
              <HiCheckBadge className=" text-2xl text-blue-700" />
            </div>
          </div>

          <div className="flex h-15 mt-3 items-start">
            <div className="flex h-full items-start mt-2 mr-4">
              <FaRegEnvelope className=" text-lg text-task-lightGray" />
            </div>
            <div className="flex h-full justify-start flex-col">
              <div className="text-lg text-task-darkWhite">
                {data?.user?.email}
              </div>
              <div className="text-task-lightGray text-sm">Email</div>
            </div>
          </div>
          <div className="flex h-15 mt-3 items-start">
            <div className="full mt-2 items-start mr-3">
              <GoChecklist className=" text-[22px] text-task-lightGray" />
            </div>
            <div className="flex h-full justify-start flex-col">
              <div className="text-lg text-task-darkWhite">
                {data?.user?.lists?.length > 0
                  ? data?.user?.lists?.length
                  : "0"}
              </div>
              <div className="text-task-lightGray text-sm">List Number</div>
            </div>
          </div>
          <div className="flex h-15 mt-3 items-start">
            <div className="h-full items-start mt-2 mr-4">
              <FaRegCalendarAlt className=" text-lg text-task-lightGray" />
            </div>
            <div className="flex h-full flex-col">
              <div className="text-md text-task-darkWhite">
                {data?.user?.createdAt.toString().split("T")[0]}
              </div>
              <div className="text-task-lightGray text-sm">Created</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
