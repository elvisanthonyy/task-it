export const runtime = "nodejs";

import dbConnect from "./dbConnection";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSession(req: Request) {
  await dbConnect();
  return await getServerSession(authOptions);
}
