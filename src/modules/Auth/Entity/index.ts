import { Gender, Sys_Role, User_Agent } from "../../../utils/common/enum";

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
    public otpExpiry!: Date;
    public role!: Sys_Role;
    public userAgent!:User_Agent
    public isVerified!:boolean

}