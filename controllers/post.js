/**
 * Gets all the posts
 * @param {http request} req 
 * @param {http response} res 
 */

const getAllPosts = (req,res)=>{
    res.send('app get post')
}

/**
 * Create new post
 * @param {http request} req 
 * @param {http response} res 
 */

const createNewPost = (req,res)=>{
    res.send('app post post')
}


module.exports = {
    getAllPosts,
    createNewPost
}