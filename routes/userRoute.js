const express = require("express");

const router = express.Router();

const {
  userRegister,
  userLogIn,
  userUpdate,
  deleteUser,
  getSingleUser,
  getUsers,
} = require("../controllers/userController");

router.post("/register", userRegister);
router.post("/login", userLogIn);
router.put("/:id", userUpdate);
router.delete("/:id", deleteUser);
router.get("/:id", getSingleUser);
router.get("/", getUsers);

module.exports = router;
