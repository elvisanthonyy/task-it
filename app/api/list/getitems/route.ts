import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { Item } from "@/app/models/item";
import { getSession } from "next-auth/react";

interface ListBody {
  listId: string;
}

const handler = async (req: Request) => {
  dbConnect();
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "session not found" });
  }
  try {
    const body = (await req?.json()) as ListBody;
    const items = await Item.find({ listId: body?.listId });
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
};

export { handler as POST };
