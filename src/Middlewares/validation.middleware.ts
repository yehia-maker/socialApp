import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "../utils/error"
import { ZodType } from "zod"
export const isValid = (schema:ZodType)=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        //spread data
        const data  = {...req.body,...req.params,...req.query}
        const {success,error}= schema.safeParse(data)
        
        if(success == false){
        let errorMessage = error?.issues.map((issue)=>({path:issue.path[0],message:issue.message}))
        throw new BadRequestException('validation error',errorMessage)
        }
        next()
    }

}