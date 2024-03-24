"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var create_1 = require("../controllers/courses/create");
var router = express_1.default.Router();
// Define routes
router.post('/create', create_1.createCourse);
router.get('/', create_1.getAllCourses);
router.get('/:id', create_1.getCourseById);
exports.default = router;
//# sourceMappingURL=course.js.map