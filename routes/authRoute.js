
const express = require('express');

const router = express.Router();

const {userRegister} = require('../controllers/authController')




router.post('/register', userRegister );



module.exports = router;