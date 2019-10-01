const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

router.get("/gag/:gagId", (req, res, next) => {
    console.log(req.params.gagId);
    Post.findById(req.params.gagId)
    .then(thePost => {
      res.render('gag', { post: thePost });
    })
    .catch(error => {
      console.log('Error while retrieving book details: ', error);
    }) 
  });

module.exports = router;