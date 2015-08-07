var express = require('express');
var router = express.Router();
var mongoPersister = require('../lib/persister/mongoPersister');


var listSource = ["통영", "가배", "저구", "대포"];
var listTime = ["09:30", "15:30"];


// 예약 등록 FORM
router.get('/new', function (req, res, next) {
  res.render('page_reservation_new', {
    listSource: listSource,
    listTime: listTime
  });
});

// 예약 등록 ACTION !
router.post('/new', function (req, res, next) {

  mongoPersister.createReservation(req.body, function (err, result) {
    console.log(err, result);
    if (err == 'EXISTED') {
      res.json({
        status: err,
        result: result
      })
    } else {
      res.json({
        status: 'OK',
        result: result
      })
    }

  });
});


// 예약 수정 FORM
router.get('/update', function (req, res, next) {

  var param = {
    listSource: listSource,
    listTime: listTime
  };

  if (req.query.d) {
    var tmpParam = JSON.parse(req.query.d);

    console.log(tmpParam);
    param['pSource'] = tmpParam.source;
    param['pDate'] = tmpParam.date.substr(0,4)+'/'+tmpParam.date.substr(4,2)+'/'+tmpParam.date.substr(6,2)+'/';
    param['pTime'] = tmpParam.time;
    param['pTel1'] = tmpParam.tel1;
    param['pTel2'] = tmpParam.tel2;
    param['pTel3'] = tmpParam.tel3;
  }
  res.render('page_reservation_update', param);
});

router.post('/retrieve', function (req, res, next) {
  mongoPersister.retrieveReservation(req.body, function (err, result) {


    console.log(err, result);

    if (err == 'NOTEXISTED') {
      res.json({
        status: 'NOTEXISTED',
        result: result
      })
    } else {
      res.json({
        status: 'OK',
        result: result
      })
    }

  });
});

router.post('/delete', function (req, res, next) {
  mongoPersister.removeReservation(req.body, function (err, result) {
    if (err) {
      res.json({
        status: 'ERROR',
        result: err
      })
    } else {
      res.json({
        status: 'OK',
        result: result
      })
    }
  });
});

router.post('/update', function (req, res, next) {
  mongoPersister.updateReservation(req.body, function (err, result) {

    if (err) {
      res.json({
        status: 'ERROR',
        result: err
      })
    } else {
      res.json({
        status: 'OK',
        result: result
      })
    }
  });
});

module.exports = router;
