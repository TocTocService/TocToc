const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.locals.user = req.user; //cuando nos logged
  res.render('index');
});

module.exports = router;
