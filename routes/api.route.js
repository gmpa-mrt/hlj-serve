import express from "express";
import ApiController from "../controllers/ApiController.js";

const router = express.Router()

router.get('/search/:word', ApiController.searchEnglishToKanji)
router.get('/search/details/:word', ApiController.searchEnglishToKanjiDetails)
router.get('/kanji-details/:kanji', ApiController.getKanji)
router.get('/kanji/all', ApiController.getAllKanji)

export default router