import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { Item } from "@/app/models/item";

const handler = async (req: Request) => {
  dbConnect();
  /*const authHeader = req.headers.get("authorization");
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "missing or invalid token" },
        { status: 401 }
      );
    }
  */
  try {
    const head = req.headers.get("referer");

    const listId = head?.split("list/")[1].split("%20")[0];
    const items = await Item.find({ listId: listId });
    return NextResponse.json({ items });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
};

export { handler as GET };
