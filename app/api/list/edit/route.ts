import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { List } from "@/app/models/list";
import { ListBody } from "../addlist/route";
import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const handler = async (req: Request) => {
  dbConnect();
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { status: "error", message: "session not found" },
      { status: 401 }
    );
  }

  try {
    //const decoded = verifyToken(token);
    const body = (await req.json()) as ListBody;

    const list = await List.findById(body?.id);
    if (!list)
      return NextResponse.json(
        { status: "error", message: "List not found" },
        { status: 404 }
      );
    list.title = body?.title;
    await list.save();
    return NextResponse.json(
      { status: "okay", message: "List title updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
};

export { handler as PUT };
