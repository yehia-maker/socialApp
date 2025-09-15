import { Gender, Sys_Role, User_Agent } from "../Common";

export interface IUser {
    firstName?:string,
    lastName?:string,
    fullName:string,
    email:string,
    password:string
    gender:Gender,
    phoneNumber:string,
    age?:string,
    otp?:string,
    otpExpiry?:string,
    role:Sys_Role
    userAgent:User_Agent

}
