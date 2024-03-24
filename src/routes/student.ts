import express, { Express, Request, Response } from "express";
const router = express.Router();
import { createAccount, login } from "../controllers/auth/student";


// Route to create a new account
router.post('/create-account', createAccount);
//login route
router.post('/login', login);

export default router;