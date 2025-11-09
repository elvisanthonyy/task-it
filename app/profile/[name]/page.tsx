import React from "react";
import Nav from "../../component/nav";
import NavigationButtons from "@/app/component/NavigationButtons";
import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();

  if (!session) return redirect("login");

  const res = await fetch("http://localhost:3000/api/user/get", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  console.log(data);
  return (
    <div>
      <Nav /> <div>{data.name}</div>
      <NavigationButtons pageName="profile" />
    </div>
  );
};

export default page;
