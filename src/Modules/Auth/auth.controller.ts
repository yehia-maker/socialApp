import { Router } from "express";
import  authService from "./auth.service";
import { isValid } from "../../Middlewares/validation.middleware";
import { registerSchema } from "./auth.validation";


const router = Router()
router.post('/register',isValid(registerSchema),authService.register)

export default router
