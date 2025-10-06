"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/user.repository");
const error_1 = require("../../utils/error");
const factory_1 = require("./factory");
const Email_1 = require("../../utils/Email");
const hash_1 = require("../../utils/hash");
const Token_1 = require("../../utils/Token");
const Otp_1 = require("../../utils/Otp");
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
    login = async (req, res) => {
        //get data from req body (email,password)
        //DTO
        const loginDTO = req.body;
        //check email existence 
        const userExist = await this.userRepo.exist({ email: loginDTO.email });
        if (!userExist)
            throw new error_1.NotFoundException('invalid credetinails');
        //check user verification
        // if (userExist.isVerified == false) throw new ForbiddenException('please verify your account first')
        //compare password
        const isMatch = await (0, hash_1.comparePassword)(loginDTO.password, userExist.password);
        if (!isMatch)
            throw new error_1.ForbiddenException('invalid credentials');
        //if 2-step-verification == true >> send email includes otp
        if (loginDTO.twoStepVerification == true) {
            //generate otp
            const otp = (0, Otp_1.generateOTP)();
            //send mail
            await (0, Email_1.sendMail)({
                to: loginDTO.email,
                subject: "verification account",
                html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
            });
        }
        //generate token 
        const token = await (0, Token_1.generateToken)({
            payload: {
                _id: userExist.id,
                role: userExist.role
            }, options: { expiresIn: "1y" }
        });
        res.status(200).json({ message: "user logged in successfully", token });
    };
    loginConfirmation = async (req, res) => {
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
        this.userRepo.update({ email: verificationDto.email }, { twoStepVerification: true, $unset: { otp: "", otpExpiry: "" } });
        //generate token 
        const token = await (0, Token_1.generateToken)({
            payload: {
                _id: userExist.id,
                role: userExist.role
            }, options: { expiresIn: "1y" }
        });
        res.status(200).json({ message: "user logged in successfully", token });
    };
    twoStepVerification = async (req, res) => {
        const userId = req.user._id;
        //check user existence 
        const userExist = await this.userRepo.exist({ _id: userId });
        if (userExist)
            throw new error_1.NotFoundException("user not found");
        //generate otp
        const otp = (0, Otp_1.generateOTP)();
        //send mail
        await (0, Email_1.sendMail)({
            to: req.user.email,
            subject: "verification code",
            html: `<p>Your OTP is <b>${otp}</b>. It expires in 5 minutes.</p>`,
        });
    };
}
exports.default = new AuthService();
