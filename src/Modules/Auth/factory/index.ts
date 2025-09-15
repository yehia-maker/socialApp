//functions that needed in service 
import { UserEntity } from './../entity/index';
import { RegisterDto } from './../auth.dto';
import { Sys_Role, User_Agent } from '../../../Utils/Common';
import { generateExpiryDate, generateOTP } from '../../../Utils/OTP';
import { hashPassword } from '../../../Utils/Hash';
export class AuthFactory{
    async register(registerDto:RegisterDto){
        //new instance from userEntity
        const user = new UserEntity()
        user.fullName = registerDto.fullName
        user.email = registerDto.email
        user.password = await hashPassword (registerDto.password)
        user.gender = registerDto.gender
        user.phoneNumber = registerDto.phoneNumber as string
        user.otp = generateOTP() as unknown as string
        user.otpExpiry = generateExpiryDate() as unknown as string
        user.role = Sys_Role.user
        user.userAgent = User_Agent.local
        return user
     }
}