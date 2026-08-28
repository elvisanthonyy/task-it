import LoginMain from "../component/LoginMain";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Task It - Log in to your account",
};

const Page = () => {
  return (
    <main className="flex w-full md:bg-[url('/extras/background-ball-desktop.svg')] bg-[url('/extras/background-balls.png')] bg-no-repeat bg-fixed bg-cover h-screen justify-center items-center">
      <LoginMain />
    </main>
  );
};

export default Page;
