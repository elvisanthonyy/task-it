import mongoose, { Document, Schema, Types, models } from "mongoose";

export interface IList extends Document {
  title: string;
  userId: Types.ObjectId;
  items: string[];
}

const listSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const List = models.List || mongoose.model<IList>("List", listSchema);
