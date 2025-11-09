import { List } from "@/app/models/list";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/libs/session";
import dbConnect from "@/libs/dbConnection";

interface ListBody {
  id: string;
}
const handler = async (req: NextRequest) => {
  dbConnect();
  const session = await getSession();
  console.log(session);
  if (!session) {
    return NextResponse.json({ mession: "session not found" });
  }
  try {
    const body = (await req.json()) as ListBody;
    const list = await List.findOne({ _id: body?.id });
    return NextResponse.json({ list });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "something went wrong" });
  }
};

export { handler as POST };
