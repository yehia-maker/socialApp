"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const Common_1 = require("../Common");
exports.commentSchema = new mongoose_1.Schema({
    content: {
        type: String
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // reactions: [recationSchema],
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    reactions: [Common_1.recationSchema],
    isFrozen: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
exports.commentSchema.virtual('replies', {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId"
});
exports.commentSchema.pre("deleteOne", async function (next) {
    const filter = this.getFilter();
    const replies = await this.model.find({ parentId: filter._id });
    if (replies.length > 0) {
        for (const reply of replies) {
            await this.model.deleteOne({ _id: reply._id });
        }
    }
});
