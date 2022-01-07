const router = require('express').Router()
const UserController  = require("../controllers/UserController");

router.get('/users', UserController.user_get_all)
router.post('/register', UserController.user_create)
router.patch('/update/:id', UserController.user_update)


module.exports = router;