const express = require("express");
const { newPost, getPostbyID, newComment } = require("../controllers/post");
const { PostValidate, isPostValidated } = require("../validator/post");
const router = require("./challenge");

router.post("/newpost", PostValidate, isPostValidated, newPost);

router.post("/getpostbyid", getPostbyID);

router.post("/newcomment", newComment);

module.exports = router;
