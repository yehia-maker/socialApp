import { Request, Response } from "express";
import { UpdateUserDTO } from "./user.dto";
import { UserRepository } from './../../DB/user.repository';
import { NotAuthorizedException, NotFoundException } from "../../utils/error";
import { comparePassword, hashPassword } from "../../utils/hash";
import { generateExpiryDate, generateOTP } from "../../utils/Otp";
import { sendMail } from "../../utils/Email";

export class UserService {
    private readonly userRepository = new UserRepository()

    public updateInfo = async (req: Request, res: Response) => {
        const userId = req.user._id
        //get data from req
        const updateUserDTO: UpdateUserDTO = req.body
        //check user existence 
        const userExist = await this.userRepository.exist({ _id: userId })
        if (!userExist) throw new NotFoundException("user doesnt exist")

        //update user 
        const updatedData = await this.userRepository.update({ _id: userId }, {
            $set: { email: updateUserDTO.email, age: updateUserDTO.age, fullName: updateUserDTO.fullName }
        })
        return res.status(200).json({ message: "user updated successfully", data: updatedData })


    }
    public updateOldPassword = async (req: Request, res: Response) => {
        //         update password (
        // send old password >> compare password >> update password 
        // if doesnt exist >> send an otp to verify >> hash new password >> update password
        // )
        const { oldPassword, newPassword } = req.body
        const userId = req.user._id

        const userExist = await this.userRepository.exist({ _id: userId })
        const result = await comparePassword(oldPassword, userExist.password)
        if (result == false) {
            throw new NotAuthorizedException("old password wrong!!")
        }
        const newHashedPassword = await hashPassword(newPassword)
        const updatedPassword = await this.userRepository.update({ _id: userId }, { password: newHashedPassword })
        return res.status(200).json({ message: "password upated successfully" })

    }
    public requestOtp = async (req: Request, res: Response) => {
        const userId = req.user._id;
        const otp = generateOTP();

        await this.userRepository.update(
            { _id: userId },
            { otp, otpExpiry: Date.now() + 5 * 60 * 1000 }
        );

        await sendMail({
            to: req.user.email,
            subject: "Password Reset OTP",
            html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
        });

        return res.status(200).json({ message: "OTP sent to email" });
    };
    public updatePassword = async (req: Request, res: Response) => {
        const { newPassword } = req.body;
        const userId = req.user._id;
        const user = await this.userRepository.exist({ _id: userId });
        if (!user) throw new NotFoundException("User not found");
        const hashedPassword = await hashPassword(newPassword);
        await this.userRepository.update(
            { _id: userId },
            { password: hashedPassword }
        );

        return res.status(200).json({ message: "Password updated successfully via OTP" });
    };
    public block = async (req: Request, res: Response) => {
        //get data (blocked user id)
        const { blockedUserId } = req.params
        const userId = req.user._id
        console.log(blockedUserId);

        //check user existence
        const userExist = await this.userRepository.exist({ _id: userId })
        if (!userExist) throw new NotFoundException("user not found")
        //block user
        const data = await this.userRepository.update({ _id: userId }, {
            $push: { blockedUsers: blockedUserId }
        })
        return res.status(200).json({ message: "user blocked Successfully", })
    }
    public sendRequest = async (req: Request, res: Response) => {
        //get data from req(user id that i want to send him a request)
        const { reqId } = req.params
        const userId = req.user._id
        //check user existence (that i want to send him a req)
        const userExist = await this.userRepository.exist({ _id: reqId })
        if (!userExist) throw new NotFoundException("user doesnt exist")


        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $addToSet: { requests: reqId }
        }, { new: true })
        return res.status(200).json({ message: "request added successfully ", data })
    }
    public acceptRequest = async (req: Request, res: Response) => {
        //get datda from req(the accepted user id)
        const { acceptedId } = req.params
        const userId = req.user._id

        //check user existence of the accepted user
        const userExist = await this.userRepository.findbyIdAndUpdate(acceptedId, {
            $addToSet: { friends: userId }
        })
        if (!userExist) throw new NotFoundException("user doesnt exist")
        //accept the req

        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $pull: { requests: acceptedId },
            $addToSet: { friends: acceptedId }
        }, { new: true })
        return res.status(200).json({ message: "friend request accepted successfully ", data })


    }
    public deleteFriendRequest = async (req: Request, res: Response) => {
        //get data from req (user id of wants to be deletd from requests)
        const { id } = req.params
        const userId = req.user._id
        //check user existence (that wants to be deletd from requests)
        const userExist = await this.userRepository.exist({ _id: id })
        if (!userExist) throw new NotFoundException("user doesnt exist")
        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $pull: { requests: id }
        })
        return res.status(200).json({ message: "request removed successfully ", data })





    }
    public unFriend = async (req: Request, res: Response) => {
        //get datda from req( user id that wants to unfriend him)
        const { id } = req.params
        const userId = req.user._id
        //check user existence of the accepted user
        const userExist = await this.userRepository.exist({ _id: id })
        if (!userExist) throw new NotFoundException("user doesnt exist")
        //check if the user includes in friends array
        const user = await this.userRepository.exist({
            _id: userId,
            friends: id
        });
        if (!user) throw new NotFoundException("user doesnt exist in your friend list")
        //Unfriend
        const data = await this.userRepository.findbyIdAndUpdate(userId, {
            $pull: { friends: id },
        }, { new: true })
        return res.status(200).json({ message: "friend request accepted successfully ", data })



    }















}



export default new UserService()