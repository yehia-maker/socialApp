"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const db_repository_1 = require("./db.repository");
const post_model_1 = require("./models/post.model");
class PostRepository extends db_repository_1.DbRepository {
    constructor() {
        super(post_model_1.Post);
    }
}
exports.PostRepository = PostRepository;
