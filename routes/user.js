const express = require("express");
const { addUser } = require("../controllers/user.controller");
const {
  userValidate,
  isUserValidated,
} = require("../validator/user.validator");

const router = express.Router();

router.post("/register", userValidate, isUserValidated, addUser);

module.exports = router;
