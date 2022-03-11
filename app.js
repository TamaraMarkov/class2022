const express = require('express')
const app = express()
const dotenv = require("dotenv").config()

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open', ()=>console.log('connected to mongo'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb'}))
app.use(bodyParser.json())

const post_routes = require('./routes/post_routes')
app.use('/post',post_routes)

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log('server started on port '+ PORT
    )

})