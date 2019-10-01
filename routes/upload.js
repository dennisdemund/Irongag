const express = require('express');
const router  = express.Router();

router.get("/upload", (req, res, next) => {
  req.app.locals.profile = false;
  res.render("upload");
});

module.exports = router;



