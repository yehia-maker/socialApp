import { NextFunction, Request,Response } from "express";
import { RegisterDto } from "./auth.dto";
import { UserService } from "../../DB/user.db.service";
import { BadRequestException, ConflictException } from "../../Utils/Error";
import { AuthFactory } from "./factory";
// import * as z from "zod";
import { registerSchema } from "./auth.validation";

 export class AuthService{
    //taking new instance from user.db.service
    private user = new UserService()
    private authFactory = new AuthFactory()
    constructor(){}
      register= async(req:Request,res:Response,next:NextFunction)=>{
        //get data from body 
        const registerDto:RegisterDto = req.body
       
        // //validation

        // const {error , success} = registerSchema.safeParse(registerDto)

        // if(success == false){
        // let errorMessages = error?.issues.map((issue)=>({  path:issue.path[0], message:issue.message }))

        //     throw new BadRequestException('validation error', errorMessages)
        // }
       

        // check user existence 
        const userExist = await this.user.exist({email:registerDto.email})
        if(userExist){
            throw new ConflictException('user already exist')
        }

        //prepare data, use factory methods
        const userData = await this.authFactory.register(registerDto)
    
        //create user 
        await this.user.create(userData)
        
        //send respone 
        return res.status(201).json({message:"User registered successfully",data:userData})
        
        
    }

}
export default new AuthService();

