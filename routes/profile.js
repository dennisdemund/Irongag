const express = require('express');
const router  = express.Router();
const Handlebars = require('handlebars');
const Post = require("../models/post");


// User model
const User = require("../models/user");
Handlebars.registerPartial('profile', '{{navbar}}')

router.get("/profile", (req, res, next) => {
    req.app.locals.profile = true;
    res.render("profile", req.session.currentUser);
  });

router.get("/settings", (req, res, next) => {
  res.render("settings", req.session.currentUser);
});

router.get("/userPosts", (req, res, next) => {
  Post.find({uploader: req.session.currentUser}, (err, posts) => {
    res.render("userPosts", {posts});
  })  
})

router.post("/settings", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;

  if (username === "" || email === "") {
    res.render("signUp", {
      errorMessage: "Indicate a Username and Email to change."
    });
    return;
  }

  if  (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
    res.render("settings", {
      errorMessage: "Invalid E-Mail Adress"
    });
    return;
  }

  User.update({_id: req.session.currentUser._id}, { $set: {username, email}})
  .then((user) => {
    req.session.currentUser.username = username;
    req.session.currentUser.email = email;
    res.redirect('/profile');
  })
  .catch((error) => {
    console.log(error);
  })
});



module.exports = router;