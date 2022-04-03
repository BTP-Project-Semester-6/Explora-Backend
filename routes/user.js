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
  feedBack,
  feedBackall,
  suggestPlaces,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middleware/auth");
const {
  userValidate,
  isUserValidated,
  loginValidate,
  quizValidate,
  suggestFriendValidator,
  suggestPlacesValidator,
} = require("../validator/user.validator");

const router = express.Router();

router.post("/register", userValidate, isUserValidated, addUser);
router.get("/id/:id", isAuthenticated, getUserById);
router.get("/username/:username", isAuthenticated, getUserByUsername);
router.post("/login", loginValidate, isUserValidated, loginUserByUsername);
router.post(
  "/addpersonalityquiz",
  isAuthenticated,
  quizValidate,
  isUserValidated,
  addPersonalityQuiz
);
router.post("/allUserExceptHost", isAuthenticated, allUserExceptHost);
router.post("/getMyFriends", isAuthenticated, getMyFriends);
router.post("/searchFriends", isAuthenticated, search);
router.post("/friendRequest", isAuthenticated, friendRequest);
router.post("/friendRequestAccept", isAuthenticated, AcceptfriendRequest);

router.post("/getAllUsers", isAuthenticated, getAllUsers);

router.post(
  "/suggestfriends",
  isAuthenticated,
  suggestFriendValidator,
  isUserValidated,
  suggestFriends
);
router.post("/feedback", isAuthenticated, feedBack);
router.post("/feedbackall", isAuthenticated, feedBackall);
router.post(
  "/suggestplaces",
  isAuthenticated,
  suggestPlacesValidator,
  isUserValidated,
  suggestPlaces
);

module.exports = router;
