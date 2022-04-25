"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../controllers/auth"));
router.post('/register', auth_1.default.register);
router.post('/login', auth_1.default.login);
module.exports = router;
//# sourceMappingURL=auth_routes.js.map