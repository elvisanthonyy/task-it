import mongoose, { Schema, models, Document, Types } from "mongoose";

export interface IItem extends Document {
  name: string;
  status: string;
  listId: Types.ObjectId;
}

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "not done",
    },
    listId: {
      type: Schema.Types.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Item = models.Item || mongoose.model<IItem>("Item", itemSchema);
