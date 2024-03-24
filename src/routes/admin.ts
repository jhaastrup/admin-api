import express, { Express, Request, Response } from "express";
const router = express.Router();
import { registerAdmin, login } from "../controllers/auth/admin";


// Define routes
router.post('/register', registerAdmin);
router.post('/login', login);

export default router
