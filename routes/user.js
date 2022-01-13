const express = require("express");
const {
  addUser,
  getUserById,
  getUserByUsername,
  loginUserByUsername,
} = require("../controllers/user.controller");
const {
  userValidate,
  isUserValidated,
  loginValidate,
} = require("../validator/user.validator");

const router = express.Router();

router.post("/register", userValidate, isUserValidated, addUser);
router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.post("/login", loginValidate, isUserValidated, loginUserByUsername);

module.exports = router;
