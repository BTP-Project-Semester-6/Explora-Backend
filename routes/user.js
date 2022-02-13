const express = require("express");
const {
  addUser,
  getUserById,
  getUserByUsername,
  loginUserByUsername,
  addPersonalityQuiz,
  getAllUsers,
} = require("../controllers/user.controller");
const {
  userValidate,
  isUserValidated,
  loginValidate,
  quizValidate,
} = require("../validator/user.validator");

const router = express.Router();

router.post("/register", userValidate, isUserValidated, addUser);
router.get("/id/:id", getUserById);
router.get("/username/:username", getUserByUsername);
router.post("/login", loginValidate, isUserValidated, loginUserByUsername);
router.post(
  "/addpersonalityquiz",
  quizValidate,
  isUserValidated,
  addPersonalityQuiz
);
router.post("/getAllUsers", getAllUsers);

module.exports = router;
