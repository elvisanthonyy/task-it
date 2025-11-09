export const runtime = "nodejs";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
//import { redirect } from "next/navigation";
/*import Nav from "./component/nav";
import MainHome from "./component/MainHome";
import NavigationButtons from "./component/NavigationButtons";*/

export default async function Home() {
  try {
    const session = await getServerSession(authOptions);
    console.log("SESSION", session);
    if (!session) return <div>No sesion</div>;

    return (
      <>
        <div>hello</div>
      </>
    );
  } catch (err) {
    console.error("Error in home", err);
  }
}
