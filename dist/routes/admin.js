"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
var admin_1 = require("../controllers/auth/admin");
// Define routes
router.post('/register', admin_1.registerAdmin);
router.post('/login', admin_1.login);
exports.default = router;
//# sourceMappingURL=admin.js.map