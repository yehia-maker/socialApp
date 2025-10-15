"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postProvider = exports.authProvider = void 0;
const user_repository_1 = require("../../DB/user.repository");
const error_1 = require("../error");
exports.authProvider = {
    async checkOtp(verificationDto) {
        const userRepo = new user_repository_1.UserRepository();
        const userExist = await userRepo.exist({ email: verificationDto.email });
        if (!userExist) {
            throw new error_1.NotFoundException('user not found');
        }
        //check otp
        if (userExist.otp != verificationDto.otp)
            throw new error_1.BadRequestException("invalid otp");
        //check otp expiry
        if (new Date(userExist.otpExpiry) < new Date()) {
            throw new error_1.BadRequestException("OTP expired");
        }
    }
};
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
exports.postProvider = {
    async freeze(id, Repo, user) {
        //check post existence 
        const postExist = await Repo.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("post not found");
        //check ownership
        if (postExist.userId.toString() !== user._id.toString()) {
            throw new error_1.NotAuthorizedException("unauthorized user");
        }
        //freeze post
        if (postExist.isFrozen == false) {
            await Repo.update({ _id: id }, {
                $set: { isFrozen: true }
            });
        }
        else {
            await Repo.update({ _id: id }, {
                $set: { isFrozen: false }
            });
        }
    },
    async update(id, Repo, userId, content) {
        //check post existence 
        const postExist = await Repo.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("post not found!");
        //check ownership
        if (postExist.userId.toString() !== userId.toString())
            throw new error_1.NotAuthorizedException("unauthorized user");
        //update post(content)
        const data = await Repo.findbyIdAndUpdate(id, {
            content
        }, { new: true });
        return data;
    }
};
