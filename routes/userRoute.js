const express = require("express");

const router = express.Router();

const { userRegister, userLogIn, userUpdate } = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogIn);
router.put('/:id', userUpdate )

module.exports = router;
