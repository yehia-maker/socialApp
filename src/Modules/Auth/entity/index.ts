import { Gender, Sys_Role, User_Agent } from "../../../Utils/Common";

export class UserEntity {
    public firstName!: string;
    public lastName!: string;
    public fullName!: string;
    public email!: string;
    public password!: string
    public gender!: Gender;
    public phoneNumber!: string;
    public age!: string;
    public otp!: string;
    public otpExpiry!: string;
    public role!: Sys_Role;
    public userAgent!:User_Agent

}