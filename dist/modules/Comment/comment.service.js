"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_repository_1 = require("../../DB/post.repository");
const error_1 = require("../../utils/error");
const comment_repository_1 = require("./../../DB/models/Comments/comment.repository");
const index_1 = require("./factory/index");
const Provider_1 = require("../../utils/Provider");
class CommentService {
    postRepository = new post_repository_1.PostRepository();
    commentRepository = new comment_repository_1.CommentRepository();
    commentCreationFactory = new index_1.CommentCreationFactory();
    addComment = async (req, res) => {
        const { postId, id } = req.params;
        const commentCreationDTO = req.body;
        //check post existence 
        const postExist = await this.postRepository.exist({ _id: postId });
        if (!postExist)
            throw new error_1.NotFoundException("post not found");
        //check comment Exist
        let commentExist;
        if (id) {
            commentExist = await this.commentRepository.exist({ _id: id });
            if (!commentExist)
                throw new error_1.NotFoundException("comment not found");
        }
        console.log("commentExist", commentExist);
        //factory
        const comment = this.commentCreationFactory.create(commentCreationDTO, req.user, postExist, commentExist);
        const createdComment = await this.commentRepository.create(comment);
        res.status(201).json({ message: "comment created successfully", sucess: true, data: createdComment });
    };
    getComment = async (req, res) => {
        //get data from params(postId,id)
        const { postId, id } = req.params;
        const foundComment = await this.commentRepository.exist({ _id: id }, {}, {
            populate: { path: "replies" }
        });
        res.status(200).json({ message: "comment found successfully", sucess: true, data: foundComment });
    };
    deleteComment = async (req, res) => {
        //get comment id from params
        const { id } = req.params;
        const userId = req.user._id;
        //check comment existence 
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: { path: "postId", select: "userId" }
        });
        const post = commentExist.postId;
        if (!commentExist)
            throw new error_1.NotFoundException("comment not found");
        if (commentExist.userId.toString() !== userId.toString() && post.userId.toString() !== userId.toString()) {
            throw new error_1.NotAuthorizedException('not authorized');
        }
        await this.commentRepository.deleteOne({ _id: id });
        return res.sendStatus(204);
    };
    freezeComment = async (req, res) => {
        const { id } = req.params;
        const user = req.user;
        const result = await Provider_1.postProvider.freeze(id, this.commentRepository, user);
        return res.sendStatus(200);
    };
    update = async (req, res) => {
        //get data from req(postid)
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user._id;
        const data = await Provider_1.postProvider.update(id, this.commentRepository, userId, content);
        return res.status(200).json({ message: "post updated successfully", data });
    };
}
exports.default = new CommentService();
