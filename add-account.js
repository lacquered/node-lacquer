var Account = require('./lib/admin/account');

require('./lib/persister/mongoDatabase').config('10.0.0.4:27017', 'lacquer', function (err, message) {
    if (!err) {

      var _username = 'admin1@lacquer.com';
      var _password = '1234';

      Account.register(new Account({ username : _username }), _password, function(err, account) {
        if (err) {
          console.error(err);
        }
      });

    }else{
      console.error(err, message)
    }

  }
);