import { IComment } from "../../../utils/common/interface";
import { DbRepository } from "../../db.repository";
import { Comment } from "./comment.model";

export class CommentRepository extends DbRepository<IComment>{
    constructor(){
        super(Comment)
    }
}