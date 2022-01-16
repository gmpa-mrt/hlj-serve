import express from "express";
import SecurityController from "../controllers/SecurityController.js";

const router = express.Router()

router.post('/login', SecurityController.login)
router.get('/logout')



export default router