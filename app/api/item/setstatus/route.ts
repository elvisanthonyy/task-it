import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { Item } from "@/app/models/item";

interface ItemBody {
  status: string;
  id: string;
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
    const id = body?.id;

    const item = await Item.findOne({ _id: id });

    if (item) {
      item.status = body.status;
      await item.save();
      return NextResponse.json({ message: "status updated" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
};

export { handler as POST };
