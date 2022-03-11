const Post = require('../models/post_model')
/**
 * Gets all the posts
 * @param {http request} req 
 * @param {http response} res 
 */


const getAllPosts = async (req,res)=>{
    console.log('getAllPosts')
    
    try {
        const sender = req.query.sender
        var posts
        if (sender != null | sender != undefined) {
            posts = await Post.find({'sender' : sender})    
        }else{
            posts = await Post.find()
        }
        res.status(200).send(posts)
    } catch (err) {
        res.status(400).send({
            'message' : err.message
        })
   
    }
}

const getPostById = async(req,res)=>{
    console.log('getPostById id=' + req.params.id)
    const id = req.params.id
    if (id == null || id == undefined) 
    {
        res.status(400).send({
            'status':'fail',
            'message':err.message})     
    }
    try {
        post = await Post.findById(id)
        res.status(200).send(post)
    } catch (err) {
        res.status(400).send({
            'status':'fail',
            'message' : err.message
        })
    }

}

const deleteAllPosts = (req,res)=>{
    res.send('app delete post')
}


/**
 * Create new post
 * @param {http request} req 
 * @param {http response} res 
 */

const createNewPost = async (req,res)=>{
    console.log(req.body)

    const post = Post({
        message: req.body.message,
        sender: req.body.sender
    })
    try{
        newPost = await post.save()
        res.status(200).send(newPost)
        

    }catch(err){
        res.status(400).send({
            'message' : err.message
        })
    }
    
}


module.exports = {
    getAllPosts,
    createNewPost,
    deleteAllPosts,
    getPostById
}