import React from "react";
import Nav from "@/app/component/nav";
import ListMain from "@/app/component/ListMain";
import { getSession } from "@/libs/session";
import NavigationButtons from "@/app/component/NavigationButtons";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { listId: string } }) => {
  const cookieHeader = (await cookies()).toString();
  const basesURL = process.env.BASE_URL;
  const session = await getSession();
  if (!session) {
    redirect("login");
  }
  const list = await params;
  const firstId = list.listId.split("-")[0];

  const res = await fetch(`${basesURL}/api/get/list`, {
    method: "POST",
    headers: {
      Cookie: cookieHeader,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: firstId,
    }),
  });
  const data = await res.json();

  return (
    <>
      <div className="flex justify-center w-full h-screen ">
        <Nav />
        <ListMain list={data.list} />
        <NavigationButtons />
      </div>
    </>
  );
};

export default page;
