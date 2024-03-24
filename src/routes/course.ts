import express from "express";
import { createCourse, getAllCourses, getCourseById } from "../controllers/courses/create";
const router = express.Router();

// Define routes
router.post('/create', createCourse);
router.get('/', getAllCourses);
router.get('/:id', getCourseById)



export default router
