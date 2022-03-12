const express = require("express");
const {
  newPost,
  getPostbyID,
  newComment,
  likePost,
  getAllPosts,
  getSinglePost,
} = require("../controllers/post");
const { isAuthenticated } = require("../middleware/auth");
const { PostValidate, isPostValidated } = require("../validator/post");
const router = require("./challenge");

router.post(
  "/newpost",
  isAuthenticated,
  PostValidate,
  isPostValidated,
  newPost
);

router.post("/getpostbyid", isAuthenticated, getPostbyID);

router.post("/newcomment", isAuthenticated, newComment);

router.post("/likepost", isAuthenticated, likePost);
router.post("/getallposts", isAuthenticated, getAllPosts);
router.get("/getsinglepost/:id", isAuthenticated, getSinglePost);

module.exports = router;
