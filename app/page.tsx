import { getSession } from "@/libs/session";

//import { redirect } from "next/navigation";
/*import Nav from "./component/nav";
import MainHome from "./component/MainHome";
import NavigationButtons from "./component/NavigationButtons";*/

export default async function Home() {
  try {
    const session = await getSession();
    console.log("SESSION", session);
    if (!session) return <div>No sesion</div>;

    return (
      <>
        <div>{session?.user?.name}</div>
      </>
    );
  } catch (err) {
    console.error("Error in home", err);
  }
}
