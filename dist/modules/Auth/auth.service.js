"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/user.repository");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
//create send mail using nodeMailer
//use mongoose hooks
class AuthService {
    userRepo = new user_repository_1.UserRepository();
    authFactory = new factory_1.AuthFactory();
    register = async (req, res, next) => {
        //get data from body
        //we have to make userDTO
        const registerDto = req.body;
        // check user existence 
        const userExist = await this.userRepo.exist({ email: registerDto.email });
        if (userExist) {
            throw new error_1.ConflictException('user already exist');
        }
        //prepare data, use factory methods
        const userData = await this.authFactory.register(registerDto);
        //send verificaion mail
        // await sendMail({
        //     to:userData.email,
        //     subject:'verfication mail',
        //     html:`<p>your otp is ${userData.otp}</p>`
        // })
        //create user
        await this.userRepo.create(userData);
        res.status(201).json({ message: 'user registered successfully', sucess: true, data: userData });
    };
    verifyAccount = async (req, res, next) => {
        //get data (email, otp) from body >> create DTO
        const verificationDto = req.body;
        //check user existence 
        const userExist = await this.userRepo.exist({ email: verificationDto.email });
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
        //    await authProvider.checkOtp(verificationDto)
        this.userRepo.update({ email: verificationDto.email }, { isVerified: true, $unset: { otp: "", otpExpiry: "" } });
        return res.sendStatus(204);
    };
}
exports.default = new AuthService();
