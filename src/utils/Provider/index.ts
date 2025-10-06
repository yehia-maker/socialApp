import { Request, Response } from "express";
import { UserRepository } from "../../DB/user.repository";
import { VerificationDTO } from "../../modules/Auth/auth.dto";
import { BadRequestException, NotFoundException } from "../error";

export const authProvider = {

async checkOtp(verificationDto:VerificationDTO){
    const userRepo  = new UserRepository()
    
     const userExist = await userRepo.exist({ email: verificationDto.email })
        if (!userExist) {
            throw new NotFoundException('user not found')
        }

        //check otp
        if (userExist.otp != verificationDto.otp) throw new BadRequestException("invalid otp")

        //check otp expiry
        if (new Date(userExist.otpExpiry!) < new Date()) {
            throw new BadRequestException("OTP expired");

        }
}

}
// export const addReactionProvider = {
//       async addReaction(reaction:string,repository:any)  {
//             //get data from req.body(postId from params,reaction number,userId from req.user(middleware))
//             // const { id } = req.params
//             // const userId = req.user._id
//             // const { reaction } = req.body
//             //check post existence
//             const postExist = await this.postRepository.exist({ _id: id })
//             if (!postExist) throw new NotFoundException('post not found')
//             //add reaction
    
//             //get user index (find method)
//             const userReactionedIndex = postExist.reactions.findIndex((reaction) => { return reaction.userId.toString() == userId.toString() })
//             console.log('index', userReactionedIndex);
//             if (userReactionedIndex == -1) {
//                 //add reaction(first time)
//                await  this.postRepository.update(
//                     { _id: id }, { $push: { reactions: { userId, reaction } } })
//             }
//             else if(['null',undefined,''].includes(reaction)){
//                 //remove reaction
//                 await this.postRepository.update(
//                     {_id:id,},
//                     {$pull:{reactions:postExist.reactions[userReactionedIndex]}}
//                 )
    
//             }
//             else{
//                 //update reaction
//                 await this.postRepository.update(
//                     {_id:id,'reactions.userId':userId},
//                     {'reactions.$.reaction':reaction}
//                 )
//             }
    
    
    
    
    
//             // return res.sendStatus(204)
    
//         }
// }
    
