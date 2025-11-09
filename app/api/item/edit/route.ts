import { NextResponse } from "next/server";
import { Item } from "@/app/models/item";
import dbConnect from "@/libs/dbConnection";

interface ItemBody {
  id: string;
  name: string;
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

    const item = await Item.findById(body?.id);

    if (!item) {
      return NextResponse.json(
        { message: "could not find item" },
        { status: 201 }
      );
    }
    item.name = body?.name;
    await item.save();
    return NextResponse.json({ message: "Item updated" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "could not update item" },
      { status: 401 }
    );
  }
};

export { handler as PUT };
