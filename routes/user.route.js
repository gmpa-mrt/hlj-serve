const router = require('express').Router()
const UserController  = require("../controllers/UserController");

router.get('/users', UserController.user_get_all)
router.get('/users/:id', UserController.user_show)
router.post('/register', UserController.user_create)
router.patch('/users/update/:id', UserController.user_update)
router.delete('/users/delete/:id', UserController.user_destroy)


module.exports = router;