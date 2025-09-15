import { NextFunction, Request, Response } from "express"
import { BadRequestException } from "../Utils/Error"
import { ZodType } from "zod"

export const isValid = (schema:ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        //validation
        const data = {...req.body,...req.params,...req.query}
        const { error, success } = schema.safeParse(data)

        if (success == false) {
            let errorMessages = error?.issues.map((issue) => ({ path: issue.path[0], message: issue.message }))

            throw new BadRequestException('validation error', errorMessages)
        }


    }
}