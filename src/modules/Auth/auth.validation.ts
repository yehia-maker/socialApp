import * as z from "zod"
import { LoginDTO, RegisterDTO } from "./auth.dto"
import { Gender } from "../../utils/common/enum"

export const registerSchema = z.object<RegisterDTO>({
    fullName:z.string().min(2).max(30)as unknown as string,
    email:z.email()as unknown as string,
    password:z.string().min(2).max(20)as unknown as string,
    gender:z.enum(Gender) as unknown as Gender,
    phoneNumber:z.string().regex(/^01[0125]\d{8}$/).optional() as unknown as string

})

export const loginSchema = z.object<LoginDTO>({
    email:z.email()as unknown as string,
    password:z.string().min(2).max(20)as unknown as string,
})