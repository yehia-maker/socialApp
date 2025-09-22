"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
const enum_1 = require("../../../utils/common/enum");
const hash_1 = require("../../../utils/hash");
const Otp_1 = require("../../../utils/Otp");
const Entity_1 = require("../Entity");
class AuthFactory {
    //create user 
    async register(registerDto) {
        const user = new Entity_1.UserEntity();
        user.fullName = registerDto.fullName;
        user.email = registerDto.email;
        user.password = await (0, hash_1.hashPassword)(registerDto.password);
        user.gender = registerDto.gender;
        user.phoneNumber = registerDto.phoneNumber;
        user.otp = (0, Otp_1.generateOTP)();
        user.otpExpiry = (0, Otp_1.generateExpiryDate)();
        user.role = enum_1.Sys_Role.user;
        user.userAgent = enum_1.User_Agent.local;
        user.isVerified = false;
        return user;
    }
}
exports.AuthFactory = AuthFactory;
