"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostFactory = void 0;
const Entity_1 = require("../Entity");
class PostFactory {
    createPost(postCreationDTO, user) {
        const post = new Entity_1.PostEntity();
        post.content = postCreationDTO.content;
        post.userId = user._id;
        post.reactions = [];
        return post;
    }
}
exports.PostFactory = PostFactory;
