import { Router } from "express";
import { registerSchema } from "./auth.validation";
import  authService from "./auth.service";
import { isValid } from "../../Middlewares/validation.middleware";


const router =  Router()
router.post('/register',isValid(registerSchema),authService.register)
router.post('/verify-account',authService.verifyAccount)
export default router