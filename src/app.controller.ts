import { dbConnection } from "./DB/connection";
import { Express } from './../node_modules/@types/express-serve-static-core/index.d';
import authRouter from './Modules/Auth/auth.controller'
import { AppError } from "./Utils/Error";
import { NextFunction } from 'express';
import { Response } from 'express';
import { Request } from 'express';
export function bootstrap(express:any,app:Express){

    //db connection       
    dbConnection()
    //app.use 
    app.use(express.json())

    app.use('/auth', authRouter); 


    //global error handler
    app.use(
        (error:AppError,req:Request,res:Response,next:NextFunction)=>{
            return res.status(error.statusCode || 500).
            json({
                message:error.message,
                success:false,
                errorDetails:error.errorDetails
            })
        }
    )


}