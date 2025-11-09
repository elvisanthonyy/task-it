import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { User } from "@/app/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

/*interface ListBody {
  id: string;
}*/

const handler = async () => {
  dbConnect();
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
  }
  try {
    const user = await User.findById(session?.user?.id);
    return NextResponse.json({ status: "okay", user: user });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "somethong went wrong",
    });
  }
};

export { handler as GET };
