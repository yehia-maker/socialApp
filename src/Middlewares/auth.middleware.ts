import { NextFunction, Request, Response } from "express"
import jwt from 'jsonwebtoken'
import { BadRequestException } from "../utils/error"
import { verifyToken } from "../utils/Token"
import { UserRepository } from "../DB/user.repository"
export const isAuthenticated = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // check token existence

        //verify token 
        const { token } = req.headers

        // if (!token) throw new BadRequestException('please login first..')
        const payload = await verifyToken(token as string)
        console.log(payload);

        //check user existence 
        const userRepo = new UserRepository()
        const user = await userRepo.exist({ _id: payload._id })
        
        req.user = user


        next()

    }
}
