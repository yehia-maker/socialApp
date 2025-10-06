import { IUser } from "../../../utils/common/interface";
import { PostEntity } from "../Entity";
import { PostCreationDTO } from './../post.dto';

export class PostFactory{

    createPost(postCreationDTO:PostCreationDTO,user:IUser){
        const post = new PostEntity()
        post.content = postCreationDTO.content
        post.userId = user._id
        post.reactions = []


        return post
    }
}