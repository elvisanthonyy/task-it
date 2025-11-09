import { NextResponse } from "next/server";
import { List } from "@/app/models/list";
import { User } from "@/app/models/user";
import dbConnect from "@/libs/dbConnection";

export interface ListBody {
  id: string;
  title: string;
}

const handler = async (req: Request) => {
  dbConnect();

  try {
    const body = (await req.json()) as ListBody;
    console.log(body?.title);
    const list = new List({
      title: body?.title,
      userId: body?.id,
    });
    await list.save();
    const user = await User.findById(body?.id);
    console.log(user);
    user?.list.push(list._id);

    await user.save();

    return NextResponse.json({
      status: "okay",
      message: "list has been added",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "somthing went wrong",
    });
  }
};

export { handler as POST };
