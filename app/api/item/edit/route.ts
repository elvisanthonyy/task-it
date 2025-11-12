import { NextResponse } from "next/server";
import { Item } from "@/app/models/item";
import dbConnect from "@/libs/dbConnection";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

interface ItemBody {
  id: string;
  name: string;
}

const handler = async (req: Request) => {
  dbConnect();
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "session not found" }, { status: 401 });
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
    return NextResponse.json(
      { status: "okay", message: "Item updated" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: "error", message: "could not update item" },
      { status: 401 }
    );
  }
};

export { handler as PUT };
