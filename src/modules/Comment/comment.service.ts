import { Request, Response } from "express";
import { PostRepository } from "../../DB/post.repository";
import { BadRequestException, NotAuthorizedException, NotFoundException } from "../../utils/error";
import { CommentRepository } from './../../DB/models/Comments/comment.repository';
import { CommentCreationDTO } from "./comment.dto";
import { CommentCreationFactory } from './factory/index';
import { postProvider } from "../../utils/Provider";


class CommentService {
    private readonly postRepository = new PostRepository()
    private readonly commentRepository = new CommentRepository()
    private readonly commentCreationFactory = new CommentCreationFactory()


    public addComment = async (req: Request, res: Response) => {
        const { postId, id } = req.params
        const commentCreationDTO: CommentCreationDTO = req.body
        //check post existence 
        const postExist = await this.postRepository.exist({ _id: postId })
        if (!postExist) throw new NotFoundException("post not found")
        //check comment Exist
        let commentExist;
        if (id) {
            commentExist = await this.commentRepository.exist({ _id: id })
            if (!commentExist) throw new NotFoundException("comment not found")

        }
        console.log("commentExist", commentExist);

        //factory
        const comment = this.commentCreationFactory.create(commentCreationDTO, req.user, postExist, commentExist)
        const createdComment = await this.commentRepository.create(comment)
        res.status(201).json({ message: "comment created successfully", sucess: true, data: createdComment })









    }
    public getComment = async (req: Request, res: Response) => {
        //get data from params(postId,id)
        const { postId, id } = req.params
        const foundComment = await this.commentRepository.exist({ _id: id }, {}, {
            populate: { path: "replies" }
        })
        res.status(200).json({ message: "comment found successfully", sucess: true, data: foundComment })

    }
    public deleteComment = async (req: Request, res: Response) => {
        //get comment id from params
        const { id } = req.params
        const userId = req.user._id
        //check comment existence 
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: { path: "postId", select: "userId" }
        })
        const post = commentExist.postId as any
        if (!commentExist) throw new NotFoundException("comment not found")
        if (commentExist.userId.toString() !== userId.toString() && post.userId.toString() !== userId.toString()) {
            throw new NotAuthorizedException('not authorized')
        }
        await this.commentRepository.deleteOne({ _id: id })

        return res.sendStatus(204)

    }
    public freezeComment = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = req.user;
        const result = await postProvider.freeze(id, this.commentRepository, user);

        return res.sendStatus(200)

    }
    public update = async (req: Request, res: Response) => {
        //get data from req(postid)
        const { id } = req.params
        const { content } = req.body
        const userId = req.user._id
        const data = await postProvider.update(id, this.commentRepository, userId, content)
        return res.status(200).json({ message: "post updated successfully", data })
    }
}

export default new CommentService()