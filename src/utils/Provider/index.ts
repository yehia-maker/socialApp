import { UserRepository } from "../../DB/user.repository";
import { VerificationDTO } from "../../modules/Auth/auth.dto";
import { BadRequestException, NotFoundException } from "../error";

export const authProvider = {

async checkOtp(verificationDto:VerificationDTO){
    const userRepo  = new UserRepository()
    
     const userExist = await userRepo.exist({ email: verificationDto.email })
        if (!userExist) {
            throw new NotFoundException('user not found')
        }

        //check otp
        if (userExist.otp != verificationDto.otp) throw new BadRequestException("invalid otp")

        //check otp expiry
        if (new Date(userExist.otpExpiry!) < new Date()) {
            throw new BadRequestException("OTP expired");

        }
}

}
    
