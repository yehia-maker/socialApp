import { Document, model } from "mongoose";
import { userSchema } from "./user.schema";
import { IUser } from "../../utils/common/interface";


export const User = model<IUser & Document>('User',userSchema)