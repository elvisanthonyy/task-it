"use client";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface ChildProps {
  iconSrc: String | StaticImport;
  name: String;
  label: string;
}

const ProfileItemComponent = ({ iconSrc, name, label }: ChildProps) => {
  const createdAt = label === "Created At" && name;
  const makeDate = new Date(`${createdAt}`);
  const formatedDate = makeDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="flex h-7 gap-6 items-center w-full">
      <div className="h-7 aspect-square flex ">
        {iconSrc && (
          <Image src={`${iconSrc}`} height={50} width={50} alt={`${name}`} />
        )}
      </div>

      <div className="text-[14px] text-deeper-text">
        <h1 className="text-[16px] text-icon-gray">
          {label === "Created At" ? formatedDate : name}
        </h1>

        <p>{label}</p>
      </div>
    </div>
  );
};

export default ProfileItemComponent;
