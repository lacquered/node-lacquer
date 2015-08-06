var express = require('express');
var router = express.Router();
var mongoPersister = require('../lib/persister/mongoPersister');


var listSource = ["통영", "가배", "저구", "대포"];
var listTime = ["09:30","15:30"];


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
    if(err == 'EXISTED') {
      res.json({
        status: err,
        result: result
      })
    }else{
      res.json({
        status: 'OK',
        result: result
      })
    }

  })
});


// 예약 수정 FORM
router.get('/update', function (req, res, next) {

  console.log('asdfasdf');
  console.log(req.query.d);

  var param = {
    listSource: listSource,
    listTime: listTime
  };

  if(req.query.d) {
    var tmpParam = JSON.parse(req.query.d);

    console.log(tmpParam);
    param['pSource'] = tmpParam.source;
    param['pDate'] = tmpParam.date;
    param['pTime'] = tmpParam.time;
    param['pTel1'] = tmpParam.tel1;
    param['pTel2'] = tmpParam.tel2;
    param['pTel3'] = tmpParam.tel3;
  }


  console.log(param);

  res.render('page_reservation_update', param);
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
