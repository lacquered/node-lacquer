var mongoose = require('mongoose'),
  paginate = require('./paginate');

var reservationModel = function () {

  var reservationSchema = mongoose.Schema({
    resno : String,
    name : String,
    date : String,
    time : String,
    cnt1 : Number,
    cnt2 : Number,
    cnt3 : Number,
    cnt4 : Number
  });

  reservationSchema.plugin(paginate);

  return mongoose.model('Message', reservationSchema);
};

module.exports = new reservationModel();