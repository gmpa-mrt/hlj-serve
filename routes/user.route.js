import express from "express";
import UserController from '../controllers/UserController.js'

const router = express.Router()

router.get('/users', UserController.user_get_all)
router.get('/users/:id', UserController.user_show)
router.post('/register', UserController.user_create)
router.patch('/users/update/:id', UserController.user_update)
router.delete('/users/delete/:id', UserController.user_destroy)

export default router