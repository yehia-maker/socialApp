
import { Schema, model } from "mongoose";
import { IFriendRequest } from "../../../utils/common/interface";
import { Status } from "../../../utils/common/enum";

export const friendRequestSchema = new Schema<IFriendRequest>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: Number,
      enum:Status,
      default: 0,
    },
  },
  { timestamps: true } 
);



