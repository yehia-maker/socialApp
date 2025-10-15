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
router.patch("/block/:blockedUserId",isAuthenticated(),UserService.block)
router.patch("/send-request/:reqId",isAuthenticated(),UserService.sendRequest)
router.patch("/accept-request/:acceptedId",isAuthenticated(),UserService.acceptRequest)
router.delete("/delete-request/:id",isAuthenticated(),UserService.deleteFriendRequest)
router.patch("/unfriend/:id",isAuthenticated(),UserService.unFriend)











export default router 
