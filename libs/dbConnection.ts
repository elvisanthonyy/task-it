import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_LOCAL_URL!);

    connection.isConnected = db.connections[0].readyState;
    console.log("connected");
  } catch (err: any) {
    console.log(err);
  }
}

export default dbConnect;
