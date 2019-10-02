const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

router.get("/gag/:gagId", (req, res, next) => {
    Post.findById(req.params.gagId)
    .then(thePost => {
      res.render('gag', { post: thePost });
    })
    .catch(error => {
      console.log('Error while retrieving post details: ', error);
    }) 
  });

  router.post('/gag/:gagId', (req, res, next) => {
    Post.update({ }, {$push: {comments: req.body.comment}});
  });

module.exports = router;