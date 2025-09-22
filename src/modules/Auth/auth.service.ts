import { NextFunction, Request, Response } from "express";
import { RegisterDTO, VerificationDTO } from './auth.dto';
import { UserRepository } from "../../DB/user.repository";
import { BadRequestException, ConflictException, NotFoundException } from "../../utils/error";
import { AuthFactory } from "./factory";
import { sendMail } from "../../utils/Email";
import { authProvider } from "../../utils/Provider";
//create send mail using nodeMailer
//use mongoose hooks
class AuthService {
    private userRepo = new UserRepository()
    private authFactory = new AuthFactory()

    register = async (req: Request, res: Response, next: NextFunction) => {
        //get data from body
        //we have to make userDTO
        const registerDto: RegisterDTO = req.body
        // check user existence 
        const userExist = await this.userRepo.exist({ email: registerDto.email })
        if (userExist) {
            throw new ConflictException('user already exist')
        }

        //prepare data, use factory methods
        const userData = await this.authFactory.register(registerDto)

        //send verificaion mail
        // await sendMail({
        //     to:userData.email,
        //     subject:'verfication mail',
        //     html:`<p>your otp is ${userData.otp}</p>`
        // })



        //create user
        await this.userRepo.create(userData)

        res.status(201).json({ message: 'user registered successfully', sucess: true,data:userData })

    }
    verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
        //get data (email, otp) from body >> create DTO
        const verificationDto: VerificationDTO = req.body
        //check user existence 
        const userExist = await this.userRepo.exist({ email: verificationDto.email })
        if (!userExist) {
            throw new NotFoundException('user not found')
        }

        //check otp
        if (userExist.otp != verificationDto.otp) throw new BadRequestException("invalid otp")

        //check otp expiry
        if (new Date(userExist.otpExpiry!) < new Date()) {
            throw new BadRequestException("OTP expired");
        }
    //    await authProvider.checkOtp(verificationDto)
       this.userRepo.update({email:verificationDto.email},
        {isVerified:true,$unset:{otp:"",otpExpiry:""}},
       );

        return res.sendStatus(204)
    }

}
export default new AuthService()