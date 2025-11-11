import dbConnect from "@/libs/dbConnection";
import { Item } from "@/app/models/item";
import { NextResponse } from "next/server";
import { List } from "@/app/models/list";

interface ItemBody {
  id: string;
  listId: string;
}

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
    const body = (await req.json()) as ItemBody;
    await Item.findByIdAndDelete(body?.id);
    const list = await List.findById(body?.listId);
    console.log(list);
    await List.updateOne({ _id: body?.listId }, { $pull: { items: body?.id } });
    return NextResponse.json({ message: "item deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "somthing went wrong" });
  }
};

export { handler as POST };
