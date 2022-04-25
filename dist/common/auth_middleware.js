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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_codes_1 = require("http-status-codes");
const authMiddleware = (req, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers['authorization'];
    if (token == undefined || token == null) {
        console.log("token == undefined || token == null");
        return response.status(http_status_codes_1.StatusCodes.FORBIDDEN).send({ err: "token == undefined || token == null" });
    }
    token = token.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, userId) => {
        if (err != null) {
            console.log("jwt.verify error: " + err.message);
            return response.status(http_status_codes_1.StatusCodes.FORBIDDEN).send({ err: err.message });
        }
        req.body._id = userId;
        next();
    });
});
module.exports = authMiddleware;
//# sourceMappingURL=auth_middleware.js.map