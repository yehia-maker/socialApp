"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const user_repository_1 = require("../../DB/user.repository");
const error_1 = require("../error");
exports.authProvider = {
    async checkOtp(verificationDto) {
        const userRepo = new user_repository_1.UserRepository();
        const userExist = await userRepo.exist({ email: verificationDto.email });
        if (!userExist) {
            throw new error_1.NotFoundException('user not found');
        }
        //check otp
        if (userExist.otp != verificationDto.otp)
            throw new error_1.BadRequestException("invalid otp");
        //check otp expiry
        if (new Date(userExist.otpExpiry) < new Date()) {
            throw new error_1.BadRequestException("OTP expired");
        }
    }
};
