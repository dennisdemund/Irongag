const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

/*
router.get("/", (req, res, next) => {
  req.app.locals.profile = false;
  res.render("index");
});
*/

router.get("/", (req, res, next) => {
  Post.find((err, posts) => {
    res.render('index', {posts})
  })  
});

module.exports = router;



