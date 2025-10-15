import { Schema } from "mongoose";
import { IComment } from "../../../utils/common/interface";
import { recationSchema } from "../Common";
import { Comment } from "./comment.model";

export const commentSchema = new Schema<IComment>({
    content: {
        type: String
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // reactions: [recationSchema],
    parentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    reactions: [recationSchema],
    isFrozen:{
    type:Boolean,
    default:false
}


}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
commentSchema.virtual('replies', {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
})

commentSchema.pre("deleteOne", async function (next) {
    const filter = this.getFilter()
    const replies = await this.model.find({ parentId: filter._id })
    if (replies.length > 0) {
        for (const reply of replies) {
            await this.model.deleteOne({_id:reply._id})
        }
    }
})