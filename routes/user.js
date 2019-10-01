const express = require('express');
const router  = express.Router();

// User model
const User = require("../models/user");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/sign-Up", (req, res, next) => {
    res.render("signup");
  });

  router.post("/sign-Up", (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    if (username === "" || password === "" || email === "") {
      res.render("signUp", {
        errorMessage: "Indicate a Username, Email and a Password to sign up"
      });
      return;
    }

    if  (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))){
      res.render("signUp", {
        errorMessage: "Invalid E-Mail Adress"
      });
      return;
    }

    User.findOne({ "email": email })
      .then(user => {
        if (user !== null) {
          res.render("signUp", {
            errorMessage: "The Email "+email+" already exists!"
          });
          return;
        }
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);
        User.create({
          username,
          email,
          password: hashPass
        })
          .then(() => {
            res.redirect("/");
          })
          .catch(error => {
            console.log(error);
          })
      })
      .catch(error => {
        next(error);
      })
  });

router.get("/log-In", (req, res, next) => {
    res.render("login");
  });

  router.post("/log-In", (req, res, next) => {
    const theEmail = req.body.email;
    const thePassword = req.body.password;
  
    if (theEmail === "" || thePassword === "") {
      res.render("login", {
        errorMessage: "Please enter both, Email and Password to log-In."
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
            req.app.locals.currentUser = user;
            req.app.locals.session = true;
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

  router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      // cannot access session here
      req.app.locals.profile = false;
      req.app.locals.session = false;
      res.redirect("/");
    });
  });

  module.exports = router;