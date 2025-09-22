import { Gender, Sys_Role, User_Agent } from "../enum"

export interface IUser{
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
    isVerified:boolean
}