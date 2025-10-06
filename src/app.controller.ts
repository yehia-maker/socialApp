
import { json } from 'express';
import { Express } from './../node_modules/@types/express-serve-static-core/index.d';
import { dbConnection } from './DB/connection';
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
import authRouter from './modules/Auth/auth.controller'
import postRouter from "./modules/Post/post.controller"
import { AppError } from './utils/error';
import userRouter from "./modules/User/user.controller"

export function Bootstrap(app:Express,express:any){
    //db connection
    dbConnection()

    //app.use
    app.use(express.json())
    app.use('/auth',authRouter)
    app.use('/post',postRouter)
    app.use('/user',userRouter)





    //global error handler
    app.use(
        (error:AppError,req:Request,res:Response,next:NextFunction)=>{
            return res.status(error.statusCode || 500)
            .json({
                message:error.message,
                sucess:false,
                errorDetails:error.errorDetails
            })

        
    })
    
}