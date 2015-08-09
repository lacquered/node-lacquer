var mongoose = require('mongoose'),
  paginate = require('./paginate');

var reservationModel = function () {

  var reservationSchema = mongoose.Schema({
    source: String,
    date: String,
    time: String,
    tel1: String,
    tel2: String,
    tel3: String,
    name : String,
    ferryCnt1: Number,
    ferryCnt2: Number,
    ferryCnt3: Number,
    ferryCnt4: Number,
    lunchCnt1: Number,
    lunchCnt2: Number
  });

  reservationSchema.plugin(paginate);

  return mongoose.model('Reservation', reservationSchema);
};

module.exports = new reservationModel();