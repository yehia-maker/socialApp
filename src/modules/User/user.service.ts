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
        const { oldPassword,newPassword } = req.body
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












}



export default new UserService()