import { Request, Response } from "express";
import { PostCreationDTO } from './post.dto';
import { PostRepository } from './../../DB/post.repository';
import { PostFactory } from './Factory/index';
import { NotAuthorizedException, NotFoundException } from "../../utils/error";
import { postProvider } from "../../utils/Provider";


class PostService {
    private postRepository = new PostRepository()
    private postFactory = new PostFactory()

    create = async (req: Request, res: Response) => {
        //get data from req.body(content)
        //create DTo
        const postCreationDTO: PostCreationDTO = req.body
        //create factory
        const post = this.postFactory.createPost(postCreationDTO, req.user)
        //REPO
        const createdPost = await this.postRepository.create(post)
        return res.status(201).json({ message: 'post created successfully', sucess: true, data: createdPost })
    }
    addReaction = async (req: Request, res: Response) => {
        //get data from req.body(postId from params,reaction number,userId from req.user(middleware))
        const { id } = req.params
        const userId = req.user._id
        const { reaction } = req.body
        //check post existence
        const postExist = await this.postRepository.exist({ _id: id })
        if (!postExist) throw new NotFoundException('post not found')
        //add reaction

        //get user index (find method)
        const userReactionedIndex = postExist.reactions.findIndex((reaction) => { return reaction.userId.toString() == userId.toString() })
        console.log('index', userReactionedIndex);
        if (userReactionedIndex == -1) {
            //add reaction(first time)
            await this.postRepository.update(
                { _id: id }, { $push: { reactions: { userId, reaction } } })
        }
        else if (['null', undefined, ''].includes(reaction)) {
            //remove reaction
            await this.postRepository.update(
                { _id: id, },
                { $pull: { reactions: postExist.reactions[userReactionedIndex] } }
            )

        }
        else {
            //update reaction
            await this.postRepository.update(
                { _id: id, 'reactions.userId': userId },
                { 'reactions.$.reaction': reaction }
            )
        }





        return res.sendStatus(204)

    }
    getSpecificPost = async (req: Request, res: Response) => {
        //get data from req.body(postId in params)
        const { id } = req.params
        //check post existence
        const postExist = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [{ path: "userId", select: "firstName lastName fullName" },
            { path: "reactions.userId", select: "firstName lastName fullName" },
            { path: "comments", match: { parentId: undefined } }
            ]
        })
        if (!postExist) throw new NotFoundException('post not found')
        return res.status(200).json({ data: postExist })
    }
    deletePost = async (req: Request, res: Response) => {
        //get data from req(id)
        const { id } = req.params
        const userId = req.user._id
        //check post existence 
        const postExist = await this.postRepository.exist({ _id: id })
        if (!postExist) throw new NotFoundException("post not found!")
        //check ownership
        if (postExist.userId.toString() !== userId.toString()) throw new NotAuthorizedException("unauthorized user")
        //delete post
        await this.postRepository.deleteOne({ _id: id })
    }
    freezePost = async (req: Request, res: Response) => {
        const { id } = req.params;
        const user = req.user;
        const result = await postProvider.freeze(id, this.postRepository, user);

        return res.sendStatus(200)

    }
    public update = async (req: Request, res: Response) => {
        //get data from req(postid)
        const { id } = req.params
        const {content} = req.body
        const userId = req.user._id
      const data = await postProvider.update(id,this.postRepository,userId,content)
        return res.status(200).json({message:"post updated successfully",data})
    }

}

export default new PostService()