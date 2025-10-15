"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("./../../DB/post.repository");
const index_1 = require("./Factory/index");
const error_1 = require("../../utils/error");
const Provider_1 = require("../../utils/Provider");
class PostService {
    postRepository = new post_repository_1.PostRepository();
    postFactory = new index_1.PostFactory();
    create = async (req, res) => {
        //get data from req.body(content)
        //create DTo
        const postCreationDTO = req.body;
        //create factory
        const post = this.postFactory.createPost(postCreationDTO, req.user);
        //REPO
        const createdPost = await this.postRepository.create(post);
        return res.status(201).json({ message: 'post created successfully', sucess: true, data: createdPost });
    };
    addReaction = async (req, res) => {
        //get data from req.body(postId from params,reaction number,userId from req.user(middleware))
        const { id } = req.params;
        const userId = req.user._id;
        const { reaction } = req.body;
        //check post existence
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException('post not found');
        //add reaction
        //get user index (find method)
        const userReactionedIndex = postExist.reactions.findIndex((reaction) => { return reaction.userId.toString() == userId.toString(); });
        console.log('index', userReactionedIndex);
        if (userReactionedIndex == -1) {
            //add reaction(first time)
            await this.postRepository.update({ _id: id }, { $push: { reactions: { userId, reaction } } });
        }
        else if (['null', undefined, ''].includes(reaction)) {
            //remove reaction
            await this.postRepository.update({ _id: id, }, { $pull: { reactions: postExist.reactions[userReactionedIndex] } });
        }
        else {
            //update reaction
            await this.postRepository.update({ _id: id, 'reactions.userId': userId }, { 'reactions.$.reaction': reaction });
        }
        return res.sendStatus(204);
    };
    getSpecificPost = async (req, res) => {
        //get data from req.body(postId in params)
        const { id } = req.params;
        //check post existence
        const postExist = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [{ path: "userId", select: "firstName lastName fullName" },
                { path: "reactions.userId", select: "firstName lastName fullName" },
                { path: "comments", match: { parentId: undefined } }
            ]
        });
        if (!postExist)
            throw new error_1.NotFoundException('post not found');
        return res.status(200).json({ data: postExist });
    };
    deletePost = async (req, res) => {
        //get data from req(id)
        const { id } = req.params;
        const userId = req.user._id;
        //check post existence 
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist)
            throw new error_1.NotFoundException("post not found!");
        //check ownership
        if (postExist.userId.toString() !== userId.toString())
            throw new error_1.NotAuthorizedException("unauthorized user");
        //delete post
        await this.postRepository.deleteOne({ _id: id });
    };
    freezePost = async (req, res) => {
        const { id } = req.params;
        const user = req.user;
        const result = await Provider_1.postProvider.freeze(id, this.postRepository, user);
        return res.sendStatus(200);
    };
    update = async (req, res) => {
        //get data from req(postid)
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        const data = await Provider_1.postProvider.update(id, this.postRepository, userId, content);
        return res.status(200).json({ message: "post updated successfully", data });
    };
}
exports.default = new PostService();
