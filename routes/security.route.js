import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router()

router.post('/register', UserController.user_create)
router.get('/login')
router.get('/logout')



export default router