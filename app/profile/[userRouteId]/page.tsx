import React from "react";
import Nav from "../../component/nav";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

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
    <div>
      <Nav name="profile" />
      <div className="flex flex-col w-full px-[6%]">
        <div className="mt-30">{`Name: ${data?.user?.name}`}</div>
        <div className="mt-4">{`Email: ${data?.user?.email}`}</div>
        <div className="mt-4">{`Lists: ${data?.user?.list.length}`}</div>
        <div className="mt-4">
          {" "}
          {`Account Creattion: ${
            data?.user?.createdAt.toString().split("T")[0]
          }`}
        </div>
      </div>
    </div>
  );
};

export default page;
