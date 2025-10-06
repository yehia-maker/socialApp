import { ObjectId } from "mongoose";

export interface PostCreationDTO {
    content: string,
    userId: ObjectId
    attachments?: any[]
}