import dbConnect from "@/libs/dbConnection";
import { NextResponse } from "next/server";
import { Item } from "@/app/models/item";
import { List } from "@/app/models/list";

interface ItemBody {
  id: string;
  name: string;
}
const handler = async (req: Request) => {
  dbConnect();
  try {
    const body = (await req.json()) as ItemBody;
    const item = new Item({
      name: body?.name,
      listId: body?.id,
    });
    const list = await List.findById(body?.id);

    await item.save();
    list.items.push(item._id);
    await list.save();
    return NextResponse.json({
      status: "okay",
      message: "item created successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: "okay",
      message: "item created successfully",
    });
  }
};
export { handler as POST };
