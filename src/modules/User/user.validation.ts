import * as z from "zod"
export const updateInfoSchema = z.object({
    fullName : z.string().min(2).max(30),
    email:z.email(),
    age:z.string()
})