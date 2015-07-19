var Reservation = require('./model/reservation');


exports.createReservation = function(input, done) {
console.log(input);
  var _m = new Reservation(input);

  if (done) {
    _m.save(done);
  } else {
    _m.save();
  }

};


exports.updateReservation = function(input, done) {

  var query = {resno: input.resno};

  Reservation.findOne(query, function(err, res) {
    if (err) return done(err);
    if (!err && !res) {
      return done('ERR-NOTEXIST');
    }

    res.save(function(err) {
      if (err) return done(err);

      done(null, res);
    });
  });

};

exports.removeReservation = function(input, done) {
  Reservation.remove({ resno: input.resno }, function (err) {
    if (done) done(err);
  });

}
