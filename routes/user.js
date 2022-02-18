const express = require("express");
const {
  addUser,
  getUserById,
  getUserByUsername,
  loginUserByUsername,
  addPersonalityQuiz,
  allUserExceptHost,
  getMyFriends,
  search,
  friendRequest,
  AcceptfriendRequest,
  suggestFriends,
  getAllUsers,
} = require("../controllers/user.controller");
const {
  userValidate,
  isUserValidated,
  loginValidate,
  quizValidate,
  suggestFriendValidator,
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
router.post("/allUserExceptHost", allUserExceptHost);
router.post("/getMyFriends", getMyFriends);
router.post("/searchFriends", search);
router.post("/friendRequest", friendRequest);
router.post("/friendRequestAccept", AcceptfriendRequest);

router.post("/getAllUsers", getAllUsers);

router.post(
  "/suggestfriends",
  suggestFriendValidator,
  isUserValidated,
  suggestFriends
);

module.exports = router;
