var express = require('express');
var router = express.Router();
var mongoPersister = require('../lib/persister/mongoPersister');

router.post('/write', function (req, res, next) {
  mongoPersister.createReservation(req.body, function (err, result) {
    res.json(result);
  })
});

router.post('/', function (req, res, next) {
  mongoPersister.retrieveReservation(req.body, function (err, result) {
    res.json(result);
  })
});

router.post('/remove', function (req, res, next) {
  mongoPersister.removeReservation(req.body, function (err, result) {
    if(err) console.error(err);
    console.log(result);
    res.json(result);
  })
});

router.post('/update', function (req, res, next) {
  mongoPersister.updateReservation(req.body, function (err, result) {

    if(err) console.error(err);
    res.json(result);
  })
});

module.exports = router;
