var express = require('express');
var router = express.Router();
var mongoDatabase = require('../lib/persister/mongoDatabase');
var mongoPersister = require('../lib/persister/mongoPersister');

mongoDatabase.config('', 'lacquer', function (err, message) {
    if (!err) {
      console.info('  - Mongodb is connected');
    }
    console.log(message);
  }
);


router.post('/write', function (req, res, next) {
  //console.log(req.body);

  console.log(req.body.name);

  mongoPersister.createReservation(req.body, function (err, result) {
    console.log("SUCCESS !!!! : " + result);
  })

  res.send('respond with a resource');
});

module.exports = router;
