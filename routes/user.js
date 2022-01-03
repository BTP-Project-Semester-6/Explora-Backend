const express = require("express");
const {
  addUser,
  getUserById,
  getUserByUsername,
} = require("../controllers/user.controller");
const {
  userValidate,
  isUserValidated,
} = require("../validator/user.validator");

const router = express.Router();

router.post("/register", userValidate, isUserValidated, addUser);
router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);

module.exports = router;
