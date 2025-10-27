import express from "express";
import { getMe, login, register } from "../controllers/auth.controller"
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// POST api/auth/register

router.post("/register", register);

// POST api/auth/login

router.post("/login", login);

router.get('/me', protect, getMe);

export default router;