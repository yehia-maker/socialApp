import { Gender, Sys_Role, User_Agent } from "../../../utils/common/enum";
import { hashPassword } from "../../../utils/hash";
import { generateExpiryDate, generateOTP } from "../../../utils/Otp";
import { RegisterDTO } from "../auth.dto";
import { UserEntity } from "../Entity";

export class AuthFactory{
    //create user 
   async register(registerDto:RegisterDTO){
        const user = new UserEntity()
        user.fullName = registerDto.fullName
        user.email = registerDto.email
        user.password = await hashPassword (registerDto.password)
        user.gender = registerDto.gender as unknown as Gender
        user.phoneNumber = registerDto.phoneNumber as string
        user.otp = generateOTP() as unknown as string
        user.otpExpiry = generateExpiryDate() as unknown as Date
        user.role = Sys_Role.user
        user.userAgent = User_Agent.local
        user.isVerified = false
        return user
        
    }
}