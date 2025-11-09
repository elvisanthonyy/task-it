import { User } from "@/app/models/user";
import dbConnect from "@/libs/dbConnection";
import { NextResponse } from "next/server";

const handler = async () => {
  dbConnect();

  try {
    const users = await User.find();
    return NextResponse.json({ users: users });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: "could not retrieve data" });
  }
};

export { handler as GET };
