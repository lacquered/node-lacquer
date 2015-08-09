var Reservation = require('./model/reservation');


var getPrimaryKeys = function (_input) {
  return {
    source: _input.source,
    date: _input.date,
    time: _input.time,
    tel1: _input.tel1,
    tel2: _input.tel2,
    tel3: _input.tel3
  };
};

var getCurrentDate = function() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!

  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  }
  if(mm<10){
    mm='0'+mm
  }
  return yyyy+""+mm+""+dd;

}


exports.createReservation = function (input, done) {

  var query = getPrimaryKeys(input);

  input['created'] = getCurrentDate(); // 등록일자 추가
  input['status'] = 'R'; // 'R' (예약대기, READY)

  Reservation.findOne(query, function (err, res) {
    if (err) return done(err);

    console.log(res);
    if (!res) {
      var _m = new Reservation(input);
      _m.save(done);

    } else {
      done('EXISTED', res);
    }
  });

};

exports.updateReservation = function (input, done) {

  var query = getPrimaryKeys(input);

  Reservation.findOne(query, function (err, res) {

    if (err) return done(err);
    if (!err && !res) {
      return done('NOTEXISTED', res);
    }

    Reservation.update(query, {'$set': input}, {upsert: false}, function (err) {
      console.log(err);
      done(err, {});
    });

  });

};

exports.removeReservation = function (input, done) {

  var query = getPrimaryKeys(input);

  Reservation.remove(query).exec(function (err) {
    if (err) {
      done(err);
    } else {
      done(null, {});
    }
  });

};


exports.retrieveReservation = function (input, done) {

  var query = getPrimaryKeys(input);

  Reservation.findOne(query, function (err, res) {

    console.log('결과 - ', err, res);

    if (err) return done(err, res);

    if (!res) return done('NOTEXISTED', res);

    done(null, res);
  });

};


exports.retrieveReservationList = function (input, done) {

  Reservation.find(input, function (err, res) {

    console.info(err, res);

    if (err) return done(err);
    done(null, res);
  });

};


exports.updateStatus = function (input, _status, done) {

  var query = getPrimaryKeys(input);

  Reservation.findOne(query, function (err, res) {

    if (err) return done(err);
    if (!err && !res) {
      return done('NOTEXISTED', res);
    }

    Reservation.update(query, {'$set': {status: _status}}, {upsert: false}, function (err) {
      console.log(err);
      done(err, {});
    });

  });


};

