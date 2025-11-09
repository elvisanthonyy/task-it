export const runtime = "nodejs";

import dbConnect from "./dbConnection";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function getSession() {
  await dbConnect();
  return await getServerSession(authOptions);
}
