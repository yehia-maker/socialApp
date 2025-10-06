import { Router } from "express";
import  UserService from "./user.service";
import { isAuthenticated } from "../../Middlewares/auth.middleware";
import { isValid } from "../../Middlewares/validation.middleware";
import { updateInfoSchema } from "./user.validation";

const router = Router()
router.put("",isAuthenticated(),isValid(updateInfoSchema),UserService.updateInfo)
router.patch("/update-old-password",isAuthenticated(),UserService.updateOldPassword)
router.post("/request-otp",isAuthenticated(),UserService.requestOtp)
router.post("/update-password",isAuthenticated(),UserService.updatePassword)






export default router 
