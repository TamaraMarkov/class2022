const request = require('supertest')
const app = require('../server')
const mongoose = require('mongoose')
const Post = require('../models/post_model')
const message = "this is my test message"
const sender = "1234567890"
var retId = ""

beforeAll(async ()=>{
    await Post.remove({"sender" : sender})
})

afterAll(async ()=>{
    //await Post.remove({"sender" : sender})
    mongoose.connection.close()
})

describe("this is Post API test",()=>{
    test("test Post get API", async ()=>{
        const response = await request(app).get('/post')
        expect(response.statusCode).toEqual(200)
    })

    test("test Post post API", async ()=>{
            const response = await request(app).post('/post').send({
                "message" : message,
                "sender" : sender
            })
            expect(response.statusCode).toEqual(200)
            const retMessage = response.body.message
            const retSender = response.body.sender
            retId = response.body._id

            expect(retMessage).toEqual(message)
            expect(retSender).toEqual(sender)
            expect(retId).not.toEqual(null)
        })

        test("test get Post by id API", async ()=>{
            const response = await request(app).get('/post/' + retId)
            expect(response.statusCode).toEqual(200)
            const retMessage = response.body.message
            const retSender = response.body.sender
            const retId2 = response.body._id
            expect(retMessage).toEqual(message)
            expect(retSender).toEqual(sender)
            expect(retId2).toEqual(retId)
        })

        test("test get Post by sender API", async ()=>{
            const response = await request(app).get('/post?sender=' + sender)
            expect(response.statusCode).toEqual(200)
            const retMessage = response.body[0].message
            const retSender = response.body[0].sender
            const retId2 = response.body[0]._id
            expect(retMessage).toEqual(message)
            expect(retSender).toEqual(sender)
            expect(retId2).toEqual(retId)
        })

        test("test delete Post by id API", async ()=>{
            const response = await request(app).delete('/post/' + retId)
            expect(response.statusCode).toEqual(200)

            const response2 = await request(app).get('/post/' + retId)
            expect(response2.statusCode).toEqual(400)

            
        })
})
