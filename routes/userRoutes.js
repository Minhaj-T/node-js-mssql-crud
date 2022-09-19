const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController')
const validation = require("../middleware/validate-request");

router.post('/',validation.UserRegiser, registerUser)
router.post('/login', loginUser)
router.get('/:id', getMe)

module.exports = router
