import mongoose from "mongoose";
import { postSchema } from "./post.schema";


export const Post = mongoose.model("Post",postSchema)