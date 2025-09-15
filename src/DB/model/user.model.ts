import { model } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "../../Utils/Interfaces";
import { Document } from "mongoose";

export const User = model<IUser & Document>("User",userSchema)
