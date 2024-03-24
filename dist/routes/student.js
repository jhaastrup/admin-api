"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var student_1 = require("../controllers/auth/student");
// Route to create a new account
router.post('/create-account', student_1.createAccount);
//login route
router.post('/login', student_1.login);
exports.default = router;
//# sourceMappingURL=student.js.map