var express = require('express');
var router = express.Router();
var mongoPersister = require('../lib/persister/mongoPersister');

router.post('/write', function (req, res, next) {

  mongoPersister.createReservation(req.body, function (err, result) {
    console.log("SUCCESS !!!! : " + result);
  })

  res.send('respond with a resource');
});

module.exports = router;
