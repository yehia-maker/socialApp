
import { IComment, IPost, IUser } from '../../../utils/common/interface';
import { CommentEntity } from '../entity';
import { CommentCreationDTO } from './../comment.dto';
import { ObjectId, Schema } from 'mongoose';
export class CommentCreationFactory {

    create(commentCreationDTO: CommentCreationDTO, user: IUser, post: IPost, comment?: IComment) {
        const newComment = new CommentEntity()
        newComment.content = commentCreationDTO.content
        newComment.reaction = []
        newComment.userId = user._id
        newComment.postId = post._id
        newComment.parentId = comment?._id
        return newComment
    }
}