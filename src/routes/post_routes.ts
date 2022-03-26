import express from "express"
const router = express.Router()
import Post from '../controllers/post'

router.get('/',Post.getAllPosts)

router.get('/:id',Post.getPostById)

router.delete('/:id',Post.deletePostById)



router.delete('/',Post.deleteAllPosts)

router.post('/',Post.createNewPost)

export = router
