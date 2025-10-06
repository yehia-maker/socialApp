import { Router } from "express"
import { isAuthenticated } from "../../Middlewares/auth.middleware"
import commentService from "./comment.service"

const router  = Router({mergeParams:true})
router.post('/{:id}',isAuthenticated(),commentService.addComment)
router.get('/:id',isAuthenticated(),commentService.getComment)
router.delete('/:id',isAuthenticated(),commentService.deleteComment)


export default router 