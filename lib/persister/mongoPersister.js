var Reservation = require('./model/reservation');
var User = require('./model/user');


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

exports.createReservation = function (input, done) {

  var query = getPrimaryKeys(input);

  console.log(query);

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

  console.log(query);

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

  console.log(query);

  Reservation.findOne(query, function (err, res) {

    console.log('결과 - ', err, res);

    if (err) return done(err, res);

    if (!res) return done('NOTEXISTED', res);

    done(null, res);
  });

};


exports.retrieveReservationList = function (input, done) {

  Reservation.find(input, function (err, res) {
    if (err) return done(err);
    done(null, res);
  });

};


/****************************************
 *  USER
 ****************************************/


exports.retrieveAuthUser = function (username, password, done) {

  User.findOne({username: username}, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {message: 'Unknown user ' + username});
    }
    user.comparePassword(password, function (err, isMatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Invalid password'});
      }
    });
  });

};

exports.checkUserId = function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
};