import React from "react";
import Nav from "@/app/component/nav";
import ListMain from "@/app/component/ListMain";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import NavigationButtons from "@/app/component/NavigationButtons";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: { listId: string } }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("login");
  }
  const list = await params;
  const firstId = list.listId.split("%20")[0];
  console.log(firstId);
  const res = await fetch("http://localhost:3000/api/get/list", {
    method: "POST",
    headers: {
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
