import dbConnect from "@/libs/dbConnection";
import { List } from "@/app/models/list";
import { Item } from "@/app/models/item";
import { NextResponse } from "next/server";
import { ListBody } from "../addlist/route";

const handler = async (req: Request) => {
  dbConnect();
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "missing or invalid token" },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as ListBody;
    await Item.deleteMany({ listId: body?.id });
    await List.findByIdAndDelete(body?.id);

    return NextResponse.json({ message: "List deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "somthing went wrong" });
  }
};

export { handler as POST };
