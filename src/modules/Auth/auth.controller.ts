import { Router } from "express";
import { loginSchema, registerSchema } from "./auth.validation";
import  authService from "./auth.service";
import { isValid } from "../../Middlewares/validation.middleware";


const router =  Router()
router.post('/register',isValid(registerSchema),authService.register)
router.post('/verify-account',authService.verifyAccount)
router.post('/login',isValid(loginSchema),authService.login)
router.post('/login-confirmation',authService.loginConfirmation)
router.post('/two-step-verification',authService.twoStepVerification)



export default router