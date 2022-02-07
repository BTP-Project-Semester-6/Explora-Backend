const express = require("express");
const {
  newPost,
  getPostbyID,
  newComment,
  likePost,
  getAllPosts,
} = require("../controllers/post");
const { PostValidate, isPostValidated } = require("../validator/post");
const router = require("./challenge");

router.post("/newpost", PostValidate, isPostValidated, newPost);

router.post("/getpostbyid", getPostbyID);

router.post("/newcomment", newComment);

router.post("/likepost", likePost);
router.post("/getallposts", getAllPosts);

module.exports = router;
