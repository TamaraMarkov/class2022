const express = require("express")
const router = express.Router()
const Post = require('../controllers/post')

router.get('/',Post.getAllPosts)

router.get('/:id',Post.getPostById)


router.delete('/',Post.deleteAllPosts)

router.post('/',Post.createNewPost)

module.exports = router
