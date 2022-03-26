import express from 'express'
const app = express()
import dotenv from "dotenv"
dotenv.config()

console.log('server is starting')

import mongoose from 'mongoose'
mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open', ()=>console.log('connected to mongo'))

import bodyParser from 'body-parser'
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb'}))
app.use(bodyParser.json())

import post_routes from './routes/post_routes'
app.use('/post',post_routes)

export = app