"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const user_model_1 = __importDefault(require("../models/user_model"));
const http_status_codes_1 = require("http-status-codes");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Gets all the posts
 * @param {http request} req
 * @param {http response} res
 */
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('register');
    //res.status(200).send('register')
    //vlidate email/password
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || email == undefined || password == null || password == undefined) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    //encrypt password
    const salt = yield bcrypt_1.default.genSalt(10);
    const encryptedPassword = yield bcrypt_1.default.hash(password, salt);
    //check if email is not already taken
    //save user in DB
    const user = new user_model_1.default({
        'email': email,
        'password': encryptedPassword
    });
    try {
        const newUser = yield user.save();
        //login - create access token
        res.status(http_status_codes_1.StatusCodes.OK).send(newUser);
        const accessToken = yield jsonwebtoken_1.default.sign({ "_id": newUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        res.status(200).send({ 'accessToken': accessToken });
        // const refreshToken = await jwt.sign(
        //   { _id: newUser._id },
        //   process.env.REFRESH_TOKEN_SECRET,
        //   {}
        // );
        // newUser.refreshToken = refreshToken;
        // await newUser.save();
        // res.status(StatusCodes.OK).send({
        //   access_token: accessToken,
        //   refresh_token: refreshToken,
        //   _id: newUser._id,
        // });
        //res.status(StatusCodes.OK).send(newUser)
    }
    catch (err) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ 'err': err.message });
    }
    //login create access token
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('login');
    const email = req.body.email;
    const password = req.body.password;
    if (email == null || password == null) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .send({ error: "wrong email or password" });
    }
    try {
        // check password match
        const user = yield user_model_1.default.findOne({ email: email });
        if (user == null) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ error: "wrong email or password" });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .send({ error: "wrong email or password" });
        }
        const accessToken = yield jsonwebtoken_1.default.sign({ '_id': user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRATION });
        res.status(200).send({ 'accessToken': accessToken });
    }
    catch (err) {
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).send({ error: err.message });
    }
    // res.status(200).send('login')
});
module.exports = {
    register,
    login
};
//# sourceMappingURL=auth.js.map