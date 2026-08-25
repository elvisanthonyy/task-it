"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ChildProps {
  name: String;
}

const ProfileNav = ({ name }: ChildProps) => {
  const router = useRouter();

  return (
    <nav
      className={`z-20 fixed backdrop-blur-md px-[20px]  flex justify-between items-center w-full h-[64px] bg-background md:h-22 top-0 border-task-darkerWhite`}
    >
      <div className="flex items-center gap-4">
        <div
          onClick={() => router.back()}
          className="w-6 cursor-pointer aspect-square"
        >
          <Image
            src={"/icons/back-icon.svg"}
            height={50}
            width={50}
            alt="back btn"
            className="w-full"
          />
        </div>
        <h1 className="text-[18px] text-icon-gray">{name}</h1>
      </div>
    </nav>
  );
};

export default ProfileNav;
