import { ObjectId } from "mongoose";
import { IAttachments, IReaction } from "../../../utils/common/interface";

export class PostEntity{
    public content:string;
    public userId:  ObjectId;
    public attachments:IAttachments[];
    public reactions:IReaction[];
} 