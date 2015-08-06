var Reservation = require('./model/reservation');


exports.createReservation = function(input, done) {

  var query = {
    source: input.source,
    date: input.date,
    time: input.time,
    tel1: input.tel1,
    tel2: input.tel2,
    tel3: input.tel3
  };

  console.log(query);

  Reservation.findOne(query, function(err, res) {
    if (err) return done(err);

    console.log(res);
    if (!res) {
      var _m = new Reservation(input);

      if (done) {
        _m.save(done);
      } else {
        _m.save();
      }
    }else{
      done('EXISTED', res);
    }
  });



};

exports.updateReservation = function(input, done) {

  var query = {resno: input.resno};

  console.log(query);

  Reservation.findOne(query, function(err, res) {

    if (err) return done(err);
    if (!err && !res) {
      return done('ERR-NOTEXIST', res);
    }

    Reservation.update(query, { '$set': input }, { upsert: false }, function(err) {
      console.log(err);
      done(err, {});
    });

  });

};

exports.removeReservation = function(input, done) {

  Reservation.remove({ resno: input.resno }).exec(function(err) {
    if (err) {
      done(err);
    } else {
      done(null, {});
    }
  });

};

exports.retrieveReservation = function(input, done) {

  var query = {resno: input.resno};

  Reservation.findOne(query, function(err, res) {
    if (err) return done(err);
    done(null, res);
  });

};
