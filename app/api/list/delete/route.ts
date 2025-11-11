import dbConnect from "@/libs/dbConnection";
import { List } from "@/app/models/list";
import { Item } from "@/app/models/item";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";
import { ListBody } from "../addlist/route";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

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
    const list = await List.findById(body?.id);
    console.log(list);
    if (!list) {
      return NextResponse.json({
        status: "error",
        message: "list doesn't exist",
      });
    }
    await list.deleteOne();
    await Item.deleteMany({ listId: body?.id });
    await User.updateOne(
      { _id: session?.user?.id },
      { $pull: { lists: body?.id } }
    );

    return NextResponse.json({ status: "okay", message: "List deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "somthing went wrong",
    });
  }
};

export { handler as POST };
