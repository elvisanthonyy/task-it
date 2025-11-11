import { NextResponse } from "next/server";
import { List } from "@/app/models/list";
import { User } from "@/app/models/user";
import dbConnect from "@/libs/dbConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export interface ListBody {
  id: string;
  title: string;
}

const handler = async (req: Request) => {
  dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({
      status: "error",
      message: "session not found",
    });
  }
  try {
    const body = (await req.json()) as ListBody;

    const list = new List({
      title: body?.title,
      userId: body?.id,
    });

    const user = await User.findById(body?.id);

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "user not found",
      });
    }

    await list.save();

    user.lists.push(list._id);
    console.log(user);
    await user.save();

    return NextResponse.json({
      status: "okay",
      message: "list has been added",
    });
  } catch (error) {
    return NextResponse.json({
      status: "error",
      message: "somthing went wrong",
    });
  }
};

export { handler as POST };
