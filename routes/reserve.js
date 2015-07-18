var express = require('express');
var router = express.Router();

router.post('/write', function(req, res, next) {
  //console.log(req.body);

  console.log(req.body.name);

  res.send('respond with a resource');
});

module.exports = router;
