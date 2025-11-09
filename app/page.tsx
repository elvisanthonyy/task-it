import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import Nav from "./component/nav";
import MainHome from "./component/MainHome";
import NavigationButtons from "./component/NavigationButtons";

export default async function Home() {
  const session = await getSession();
  console.log("SESSION", session);

  return (
    <>
      <div>
        <Nav />
        <MainHome />
        <NavigationButtons pageName="home" />
      </div>
    </>
  );
}
