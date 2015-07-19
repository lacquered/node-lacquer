var mongoose = require('mongoose');

// remove this for production level.
//mongoose.set('debug', true);

var db = function() {
  var initFlag = false;
  return {

    config: function(addr, dbname, opts, callback) {
      if( !initFlag ){
        var connectUrl = 'mongodb://' + (addr ? addr : 'localhost:27017') + '/' + (dbname ? dbname : 'xpush');
        mongoose.connect(connectUrl, (opts ? opts : {}));
        //mongoose.createConnection(connectUrl, (opts ? opts : {}));

        var db = mongoose.connection;

        db.on('error', function(err) {
          // Connection Error
          console.error('Mongodb error encountered [' + err + ']');

          if (callback) {
            callback(err, 'mongodb - '+err.message);
          }
        });

        db.once('open', function() {
          initFlag = true;
          if (callback) callback(null);
        });
      } else {
        if (callback) callback(null);
      }
    }
  };
};

module.exports = db();