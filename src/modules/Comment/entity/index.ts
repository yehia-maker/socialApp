import { ObjectId } from "mongoose";
import { IReaction } from "../../../utils/common/interface";

export class CommentEntity{
    content:string
    reaction:IReaction[]
    userId:ObjectId
    postId:ObjectId
    parentId?:ObjectId
}