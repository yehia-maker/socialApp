import * as z from "zod";
import { Gender } from "../../Utils/Common";
import { RegisterDto } from "./auth.dto";

export const registerSchema = z.object<RegisterDto>({
    fullName:z.string().min(2).max(30)as unknown as string,
    email:z.email()as unknown as string,
    password:z.string().min(2).max(20)as unknown as string,
    gender:z.enum(Gender) as unknown as Gender,
    phoneNumber:z.string().regex(/^01[0125]\d{8}$/).optional() as unknown as string
})