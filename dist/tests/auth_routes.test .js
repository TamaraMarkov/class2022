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
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const mongoose_1 = __importDefault(require("mongoose"));
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await Post.remove({"sender" : sender})
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    //await Post.remove({"sender" : sender})
    mongoose_1.default.connection.close();
}));
const email = 'test@a.com';
const wrongEmail = 'test23@a.com';
const password = '1234567890';
const wrongPassword = '12342567890';
describe("this is Auth API test", () => {
    test("Test register API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/auth/register')
            .send({ "email": email, "password": password });
        expect(response.statusCode).toEqual(200);
    }));
    test("Test login API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/auth/login')
            .send({ "email": email, "password": password });
        expect(response.statusCode).toEqual(200);
    }));
    test("Test register taken email API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/auth/register')
            .send({ "email": email, "password": password });
        expect(response.statusCode).not.toEqual(200);
    }));
    test("Test login wrong email API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/auth/login')
            .send({ "email": wrongEmail, "password": password });
        expect(response.statusCode).not.toEqual(200);
    }));
    test("Test login wrong password API", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.default)
            .post('/auth/login')
            .send({ "email": email, "password": wrongPassword });
        expect(response.statusCode).not.toEqual(200);
    }));
});
//# sourceMappingURL=auth_routes.test%20.js.map