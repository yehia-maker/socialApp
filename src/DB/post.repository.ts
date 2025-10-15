import { IPost } from "../utils/common/interface";
import { DbRepository } from "./db.repository";
import { Post } from "./models/post.model";

export class PostRepository extends DbRepository<IPost>{
    constructor(){
        super(Post)
    }
}