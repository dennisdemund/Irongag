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

  router.post("/gag/:gagId", (req, res, next) => {
    console.log(req.body.comment);
    Post.update({_id: req.params.gagId}, {$push: {comments: req.body.comment}})
    .then((thePost) => {
      res.redirect(`/gag/${req.params.gagId}`);
    })
    .catch((error) => {
      console.log(error);
    });
  });


  router.post("/check/like/:postId", (req, res, next) => {
    Post.findById(req.params.postId)
    .then(thePost => {
     let arr = thePost.upvotes;
     let clicked = false;
     arr.forEach(element => {
     if (element === req.session.currentUser._id){
        clicked = true;
     }
     });
     res.send(JSON.stringify({"clicked": clicked})) ;


    })
    .catch(error => {
      console.log('Error while retrieving Post details: ', error);
    })

  });

  router.post("/check/dislike/:postId", (req, res, next) => {
    Post.findById(req.params.postId)
    .then(thePost => {
     let arr = thePost.downvotes;
     let clicked = false;
     arr.forEach(element => {
     if (element === req.session.currentUser._id){
        clicked = true;
     }
     });
     console.log(clicked);
     res.send(JSON.stringify({"clicked": clicked})) ;

    })
    .catch(error => {
      console.log('Error while retrieving Post details: ', error);
    })

  });


  router.post("/delete/:postId", (req, res, next) => {
    Post.deleteOne({_id: req.params.postId})
    .then(thePost => {
    console.log("Delete happens");
     res.redirect("/userPosts") ;

    })
    .catch(error => {
      console.log('Error while deleting Post: ', error);
    })

  });

module.exports = router;