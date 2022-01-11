import express from "express";
import ApiController from "../controllers/ApiController.js";

const router = express.Router()

router.get('/search/:world', ApiController.searchEnglishToKanji)

export default router