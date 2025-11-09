import mongoose, { model, Schema, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  avatar: string;
  lists: string[];
}

const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    lists: [
      {
        type: Schema.Types.ObjectId,
        ref: "List",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = models?.User || mongoose.model<IUser>("User", userSchema);
