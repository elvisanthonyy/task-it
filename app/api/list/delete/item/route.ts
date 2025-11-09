import { NextApiResponse } from "next";
import dbConnect from "@/libs/dbConnection";
import { Item } from "@/app/models/item";
import { NextResponse } from "next/server";

interface ItemBody {
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
    await Item.findByIdAndDelete(body?.id);
    return NextResponse.json({ message: "item deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "somthing went wrong" });
  }
};

export { handler as POST };
