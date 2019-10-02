const express = require('express');
const router  = express.Router();
const Post = require("../models/post");

router.post("/like/:postId", (req, res, next) => {
  Post.update({_id: req.params.postId}, {$push:{ upvotes: req.session.currentUser._id}})
  .then((user) => {
  })
  .catch((error) => {
    console.log(error);
  });

  Post.update({_id: req.params.postId}, {$pull:{ downvotes: req.session.currentUser._id}})
  .then((user) => {
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post("/dislike/:postId", (req, res, next) => {
  Post.update({_id: req.params.postId}, {$push:{ downvotes: req.session.currentUser._id}})
  .then((user) => {
  })
  .catch((error) => {
    console.log(error);
  });

  Post.update({_id: req.params.postId}, {$pull:{ upvotes: req.session.currentUser._id}})
  .then((user) => {
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get("/gag/:gagId", (req, res, next) => {
    Post.findById(req.params.gagId)
    .then(thePost => {
      res.render('gag', { post: thePost });
    })
    .catch(error => {
      console.log('Error while retrieving post details: ', error);
    }) 
  });

module.exports = router;