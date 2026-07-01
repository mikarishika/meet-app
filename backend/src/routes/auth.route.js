import express from 'express';
const router = express.Router();
import { login, signup, logout, board } from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.post("/onboarding", protectRoute, board);


// check if user is loged in
router.get("/me", protectRoute, (req, res) => {
    res.status(201).json({ succes: true, user: req.user })
})
export default router;
