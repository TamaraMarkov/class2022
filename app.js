const express = require('express')
const app = express()
const dotenv = require("dotenv").config()


const post_routes = require('./routes/post_routes')
app.use('/post',post_routes)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('server started on port '+ PORT
    )

})