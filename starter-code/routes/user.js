const express = require('express');
const router  = express.Router();

// User model
const User = require("../models/user");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.get("/log-In", (req, res, next) => {
    res.render("login");
  });

  router.post("/login", (req, res, next) => {
    const theEmail = req.body.email;
    const thePassword = req.body.password;
  
    if (theEmail === "" || thePassword === "") {
      res.render("login", {
        errorMessage: "Please enter both, username and password to log-In."
      });
      return;
    }
  
    User.findOne({ "email": theEmail })
    .then(user => {
        if (!user) {
          res.render("login", {
            errorMessage: "The Email doesn't exist."
          });
          return;
        }
        if (bcrypt.compareSync(thePassword, user.password)) {
          // Save the login in the session!
            req.session.currentUser = user;
          res.redirect("/");
        } else {
          res.render("login", {
            errorMessage: "Incorrect password"
          });
        }
    })
    .catch(error => {
      next(error);
    })
  });

  module.exports = router;