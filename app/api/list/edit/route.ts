import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { List } from "@/app/models/list";
import { ListBody } from "../addlist/route";

const handler = async (req: Request) => {
  dbConnect();
  const authHeader = req.headers.get("authorization");
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "missing or invalid token" },
      { status: 401 }
    );
  }

  try {
    //const decoded = verifyToken(token);
    const body = (await req.json()) as ListBody;

    const list = await List.findById(body?.id);
    if (!list)
      return NextResponse.json({ message: "List not found" }, { status: 404 });
    list.title = body?.title;
    await list.save();
    return NextResponse.json(
      { message: "List title updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400 });
  }
};

export { handler as PUT };
