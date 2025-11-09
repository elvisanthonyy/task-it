import { getSession } from "@/libs/session";

import { redirect } from "next/navigation";
import Nav from "./component/nav";
import MainHome from "./component/MainHome";
import NavigationButtons from "./component/NavigationButtons";

export default async function Home() {
  try {
    const session = await getSession();

    if (!session) return redirect("/login");

    return (
      <>
        <Nav />
        <MainHome />
        <NavigationButtons pageName="home" />
      </>
    );
  } catch (err) {
    console.error("Error in home", err);
  }
}
