import mongoose, { Schema } from "mongoose";
import { IPost, IReaction } from "../../utils/common/interface";
import { Reaction } from "../../utils/common/enum";
import { recationSchema } from "./Common";
import { Comment } from "./Comments/comment.model";


export const postSchema = new Schema<IPost>({
content:{
    type:String
},
userId:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
},
reactions:[recationSchema],
isFrozen:{
    type:Boolean,
    default:false
}

},{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}})

postSchema.virtual('comments',{
    ref:"Comment",
    localField:"_id",
    foreignField:"postId"
})

postSchema.pre("deleteOne",async function(){
  const filter = this.getFilter()
   await Comment.deleteMany({postId:filter._id})
  
})
