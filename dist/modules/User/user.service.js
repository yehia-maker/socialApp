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
    block = async (req, res) => {
        //get data (blocked user id)
        const { blockedUserId } = req.params;
        const userId = req.user._id;
        console.log(blockedUserId);
        //check user existence
        const userExist = await this.userRepository.exist({ _id: userId });
        if (!userExist)
            throw new error_1.NotFoundException("user not found");
        //block user
        const data = await this.userRepository.update({ _id: userId }, {
            $push: { blockedUsers: blockedUserId }
        });
        return res.status(200).json({ message: "user blocked Successfully", });
    };
    sendRequest = async (req, res) => {
        //get data from req(user id that i want to send him a request)
        const { reqId } = req.params;
        const userId = req.user._id;
        //check user existence (that i want to send him a req)
        const userExist = await this.userRepository.exist({ _id: reqId });
        if (!userExist)
            throw new error_1.NotFoundException("user doesnt exist");
        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $addToSet: { requests: reqId }
        }, { new: true });
        return res.status(200).json({ message: "request added successfully ", data });
    };
    acceptRequest = async (req, res) => {
        //get datda from req(the accepted user id)
        const { acceptedId } = req.params;
        const userId = req.user._id;
        //check user existence of the accepted user
        const userExist = await this.userRepository.findbyIdAndUpdate(acceptedId, {
            $addToSet: { friends: userId }
        });
        if (!userExist)
            throw new error_1.NotFoundException("user doesnt exist");
        //accept the req
        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $pull: { requests: acceptedId },
            $addToSet: { friends: acceptedId }
        }, { new: true });
        return res.status(200).json({ message: "friend request accepted successfully ", data });
    };
    deleteFriendRequest = async (req, res) => {
        //get data from req (user id of wants to be deletd from requests)
        const { id } = req.params;
        const userId = req.user._id;
        //check user existence (that wants to be deletd from requests)
        const userExist = await this.userRepository.exist({ _id: id });
        if (!userExist)
            throw new error_1.NotFoundException("user doesnt exist");
        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $pull: { requests: id }
        });
        return res.status(200).json({ message: "request removed successfully ", data });
    };
}
exports.UserService = UserService;
exports.default = new UserService();
