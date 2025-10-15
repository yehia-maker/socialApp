import { model } from "mongoose";
import { friendRequestSchema } from "./friendRequests.schema";

// Export the model
export const FriendRequest = model(
  "FriendRequest",
  friendRequestSchema
);