import { getSession } from "@/libs/session";

import { redirect } from "next/navigation";
import Nav from "./component/nav";
import MainHome from "./component/MainHome";
import NavigationButtons from "./component/NavigationButtons";

export default async function Home() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex flex-col  min-h-screen">
        <Nav />
        <MainHome />
        <NavigationButtons pageName="home" />
      </div>
    </>
  );
}
