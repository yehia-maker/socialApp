import mongoose from "mongoose";
import { commentSchema } from "./comment.schema";


export const Comment = mongoose.model('Comment',commentSchema)