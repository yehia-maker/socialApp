"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactory = void 0;
//functions that needed in service 
const index_1 = require("./../entity/index");
const Common_1 = require("../../../Utils/Common");
const OTP_1 = require("../../../Utils/OTP");
class AuthFactory {
    register(registerDto) {
        //new instance from userEntity
        const user = new index_1.UserEntity();
        user.fullName = registerDto.fullName;
        user.email = registerDto.email;
        user.password = registerDto.password;
        user.gender = registerDto.gender;
        user.phoneNumber = registerDto.phoneNumber;
        user.otp = (0, OTP_1.generateOTP)();
        user.otpExpiry = (0, OTP_1.generateExpiryDate)();
        user.role = Common_1.Sys_Role.user;
        user.userAgent = Common_1.User_Agent.local;
        return user;
    }
}
exports.AuthFactory = AuthFactory;
