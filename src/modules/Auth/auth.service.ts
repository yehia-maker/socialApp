import { NextFunction, Request, Response } from "express";
import { LoginDTO, RegisterDTO, VerificationDTO } from './auth.dto';
import { UserRepository } from "../../DB/user.repository";
import { BadRequestException, ConflictException, ForbiddenException, NotFoundException } from "../../utils/error";
import { AuthFactory } from "./factory";
import { sendMail } from "../../utils/Email";
import { authProvider } from "../../utils/Provider";
import { comparePassword } from "../../utils/hash";
import { generateToken } from "../../utils/Token";
import { generateOTP } from "../../utils/Otp";
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

        res.status(201).json({ message: 'user registered successfully', sucess: true, data: userData })

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
        this.userRepo.update({ email: verificationDto.email },
            { isVerified: true, $unset: { otp: "", otpExpiry: "" } },
        );

        return res.sendStatus(204)
    }
    login = async (req: Request, res: Response) => {
        //get data from req body (email,password)
        //DTO
        const loginDTO: LoginDTO = req.body
        //check email existence 
        const userExist = await this.userRepo.exist({ email: loginDTO.email })
        if (!userExist) throw new NotFoundException('invalid credetinails')
        //check user verification
        // if (userExist.isVerified == false) throw new ForbiddenException('please verify your account first')
        //compare password
        const isMatch = await comparePassword(loginDTO.password, userExist.password)
        if (!isMatch) throw new ForbiddenException('invalid credentials')
        //if 2-step-verification == true >> send email includes otp
        if (loginDTO.twoStepVerification == true) {
            //generate otp
            const otp = generateOTP()
            //send mail
            await sendMail({
                to: loginDTO.email,
                subject: "verification account",
                html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
            });

        }
        //generate token 

        const token = await generateToken({
            payload: {
                _id: userExist.id,
                role: userExist.role
            }, options: { expiresIn: "1y" }
        },)
        res.status(200).json({ message: "user logged in successfully", token })




    }
    loginConfirmation = async (req: Request, res: Response) => {
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
        this.userRepo.update({ email: verificationDto.email },
            { twoStepVerification: true, $unset: { otp: "", otpExpiry: "" } },
        );

       //generate token 

        const token = await generateToken({
            payload: {
                _id: userExist.id,
                role: userExist.role
            }, options: { expiresIn: "1y" }
        },)
        res.status(200).json({ message: "user logged in successfully", token })
    }
    twoStepVerification = async (req: Request, res: Response) => {
        const userId = req.user._id
        //check user existence 
        const userExist = await this.userRepo.exist({_id:userId})
        if(userExist) throw new NotFoundException("user not found")
         //generate otp
            const otp = generateOTP()
            //send mail
            await sendMail({
                to: req.user.email,
                subject: "verification code",
                html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
            });

    }

}
export default new AuthService()