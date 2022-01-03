const express = require("express");
const { newPost, getPostbyID } = require("../controllers/post");
const { PostValidate, isPostValidated } = require("../validator/post");
const router = require("./challenge");

router.post("/newpost", PostValidate, isPostValidated, newPost);

router.get("/getpostbyid",getPostbyID);

module.exports = router;