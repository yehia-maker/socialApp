import { ObjectId } from "mongoose";
import { Gender, Reaction, Status, Sys_Role, User_Agent } from "../enum";

export interface IUser{
    _id: ObjectId;
    firstName?:string,
    lastName?:string,
    fullName:string,
    email:string,
    password:string
    gender:Gender,
    phoneNumber:string,
    age?:string,
    otp?:string,
    otpExpiry?:Date,
    role:Sys_Role
    userAgent:User_Agent,
    twoStepVerification:boolean,
    blockedUsers:ObjectId[],
    requests:ObjectId[],
    friends:ObjectId[],
}

declare module "jsonwebtoken"{
    export interface JwtPayload{
        _id:string,
        role:string
    }
}

declare module"express"{
     interface Request{
        user:IUser
    }
}
export interface IAttachments{
    url:string,
    id:string
}

export interface IReaction{
  userId: ObjectId;
  reaction: Reaction;
}


export interface IPost{
    _id:ObjectId
    content:string,
    userId:ObjectId,
    reactions:IReaction[]
    attachments:IAttachments[],
    isFrozen:boolean
    //comments
}
export interface IComment{
    _id:ObjectId
    postId:ObjectId,
    parentId?:ObjectId,
   content:string,
    userId:ObjectId,
    reactions:IReaction[],
    attachments:IAttachments[],
    mentions?:ObjectId[],
    isFrozen:boolean
}
export interface IFriendRequest {
    sender: ObjectId;        
    receiver: ObjectId;        
    status: Status;
}