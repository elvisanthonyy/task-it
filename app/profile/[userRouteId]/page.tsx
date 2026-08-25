import { getSession } from "@/libs/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { FaUser } from "react-icons/fa";
import { FaRegCalendarAlt, FaRegEnvelope } from "react-icons/fa";
import ProfileNav from "@/app/component/ProfileNav";
import NavigationButtons from "@/app/component/NavigationButtons";
import ProfileItemComponent from "@/app/component/ProfileItemComponent";

const page = async () => {
  const session = await getSession();
  const cookieHeader = (await cookies()).toString();
  const basesURL = process.env.BASE_URL;
  if (!session) return redirect("login");

  const res = await fetch(`${basesURL}/api/user/get`, {
    method: "GET",
    headers: {
      Cookie: cookieHeader,
    },
  });

  const data = await res.json();

  const profileItems = [
    {
      name: { iconSrc: "/icons/name.svg", label: "Name" },
      email: { iconSrc: "/icons/email.svg", label: "Email" },
      lists: { iconSrc: "/icons/total-list.svg", label: "Total List" },
      dateOfBirth: {
        iconSrc: "/icons/date-of-biret.svg",
        label: "Date Of Birth",
      },
    },
  ];

  return (
    <div className="relative flex flex-col gap-7 pt-[64px] top-0 left-0 h-[100dvh] ">
      <ProfileNav name={data?.user?.name} />
      <section className="w-full flex flex-col items-start relative h-[280px]">
        <div className="w-full h-[188px] bg-[#0A0A0A]"></div>
        <div className="absolute bottom-0 left-[50%] translate-x-[-50%]">
          <div className="h-[153px] rounded-full aspect-square bg-white">
            <div></div>
          </div>
        </div>
      </section>
      <section className="w-full gap-8 flex flex-col px-4 py-4">
        <ProfileItemComponent
          iconSrc="/icons/name.svg"
          name={data?.user?.name}
          label="Name"
        />
        <ProfileItemComponent
          iconSrc="/icons/email.svg"
          name={data?.user?.email}
          label="Email"
        />
        <ProfileItemComponent
          iconSrc="/icons/list-number.svg"
          name={data?.user?.lists?.length}
          label="Number of lists"
        />
        <ProfileItemComponent
          iconSrc="/icons/date-of-birth.svg"
          name={data?.user?.createdAt}
          label="Created At"
        />
      </section>
      <NavigationButtons pageName="profile" />
    </div>
  );
};

export default page;
