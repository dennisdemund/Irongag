const express = require('express');
const router  = express.Router();

router.get("/", (req, res, next) => {
  req.app.locals.profile = false;
  res.render("index");
});

module.exports = router;



