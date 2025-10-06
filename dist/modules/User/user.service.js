"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("./../../DB/user.repository");
const error_1 = require("../../utils/error");
const hash_1 = require("../../utils/hash");
const Otp_1 = require("../../utils/Otp");
const Email_1 = require("../../utils/Email");
class UserService {
    userRepository = new user_repository_1.UserRepository();
    updateInfo = async (req, res) => {
        const userId = req.user._id;
        //get data from req
        const updateUserDTO = req.body;
        //check user existence 
        const userExist = await this.userRepository.exist({ _id: userId });
        if (!userExist)
            throw new error_1.NotFoundException("user doesnt exist");
        //update user 
        const updatedData = await this.userRepository.update({ _id: userId }, {
            $set: { email: updateUserDTO.email, age: updateUserDTO.age, fullName: updateUserDTO.fullName }
        });
        return res.status(200).json({ message: "user updated successfully", data: updatedData });
    };
    updateOldPassword = async (req, res) => {
        //         update password (
        // send old password >> compare password >> update password 
        // if doesnt exist >> send an otp to verify >> hash new password >> update password
        // )
        const { oldPassword, newPassword } = req.body;
        const userId = req.user._id;
        const userExist = await this.userRepository.exist({ _id: userId });
        const result = await (0, hash_1.comparePassword)(oldPassword, userExist.password);
        if (result == false) {
            throw new error_1.NotAuthorizedException("old password wrong!!");
        }
        const newHashedPassword = await (0, hash_1.hashPassword)(newPassword);
        const updatedPassword = await this.userRepository.update({ _id: userId }, { password: newHashedPassword });
        return res.status(200).json({ message: "password upated successfully" });
    };
    requestOtp = async (req, res) => {
        const userId = req.user._id;
        const otp = (0, Otp_1.generateOTP)();
        await this.userRepository.update({ _id: userId }, { otp, otpExpiry: Date.now() + 5 * 60 * 1000 });
        await (0, Email_1.sendMail)({
            to: req.user.email,
            subject: "Password Reset OTP",
            html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
        });
        return res.status(200).json({ message: "OTP sent to email" });
    };
    updatePassword = async (req, res) => {
        const { newPassword } = req.body;
        const userId = req.user._id;
        const user = await this.userRepository.exist({ _id: userId });
        if (!user)
            throw new error_1.NotFoundException("User not found");
        const hashedPassword = await (0, hash_1.hashPassword)(newPassword);
        await this.userRepository.update({ _id: userId }, { password: hashedPassword });
        return res.status(200).json({ message: "Password updated successfully via OTP" });
    };
}
exports.UserService = UserService;
exports.default = new UserService();
