const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

router.get("/upload", (req, res, next) => {
  res.render("upload");
});

router.post('/upload', (req, res, next) => {

  Post.create({
    name: req.body.postTitle,
    url: req.body.urlUpload,
    tags: req.body.postTag,
  }).then(() => {
    res.redirect("/");
  })
});


module.exports = router;
