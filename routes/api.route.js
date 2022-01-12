import express from "express";
import ApiController from "../controllers/ApiController.js";

const router = express.Router()

router.get('/search/:word', ApiController.searchEnglishToKanji)
router.get('/kanji-details/:kanji', ApiController.searchKanji)

export default router