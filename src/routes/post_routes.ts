import express from "express"
const router = express.Router()
import Post from '../controllers/post'
import authenticate from '../common/auth_middleware'

router.get('/',Post.getAllPosts)

router.get('/:id',Post.getPostById)


router.delete('/:id',authenticate,Post.deletePostById)



router.delete('/',authenticate,Post.deleteAllPosts)

router.post('/',authenticate,Post.createNewPost)

export = router
