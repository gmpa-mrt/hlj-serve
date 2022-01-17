import express from "express";
import {authJWT} from "../middlewares/authJWT.js";
import UserController from '../controllers/UserController.js'


const router = express.Router()

router.get('/users', authJWT, UserController.user_get_all)
router.get('/users/:id', UserController.user_show)
router.get('/me', authJWT, UserController.user_who_am_i)
router.post('/register', UserController.user_create)
router.post('/add/kanji/:kanji', authJWT, UserController.user_add_kanji)
router.post('/remove/kanji/:kanji', authJWT, UserController.user_remove_one_kanji)
router.post('/remove/all/kanji', authJWT, UserController.user_remove_all_kanji)
router.patch('/users/update/:id', UserController.user_update)
router.delete('/users/delete/:id', UserController.user_destroy)

export default router