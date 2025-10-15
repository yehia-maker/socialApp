"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentCreationFactory = void 0;
const entity_1 = require("../entity");
class CommentCreationFactory {
    create(commentCreationDTO, user, post, comment) {
        const newComment = new entity_1.CommentEntity();
        newComment.content = commentCreationDTO.content;
        newComment.reaction = [];
        newComment.userId = user._id;
        newComment.postId = post._id;
        newComment.parentId = comment?._id;
        return newComment;
    }
}
exports.CommentCreationFactory = CommentCreationFactory;
