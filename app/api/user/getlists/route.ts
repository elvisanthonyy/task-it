import { NextResponse } from "next/server";
import dbConnect from "@/libs/dbConnection";
import { List } from "@/app/models/list";
import { getSession } from "@/libs/session";

/*interface ListBody {
  id: string;
}*/

const handler = async () => {
  dbConnect();
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "token not found" }, { status: 401 });
  }
  try {
    const lists = await List.find({ userId: session?.user?.id });
    return NextResponse.json({ status: "okay", lists: lists });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "error",
      message: "somethong went wrong",
    });
  }
};

export { handler as GET };
