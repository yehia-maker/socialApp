import { Router } from "express"
import commentRouter from "../Comment/comment.controller"
import PostService from "./post.service"
import { isAuthenticated } from "../../Middlewares/auth.middleware"
const router  = Router()
router.use('/:postId/comment',commentRouter)
router.post('/create',isAuthenticated(),PostService.create)
router.patch('/add-reaction/:id',isAuthenticated(),PostService.addReaction)
router.get('/specific-post/:id',isAuthenticated(),PostService.getSpecificPost)
router.delete("/:id",isAuthenticated(),PostService.deletePost)



export default router