var express = require('express');
var passport = require('passport');
var mongoPersister = require('../lib/persister/mongoPersister');
var router = express.Router();

/*
 router.get('/register', function(req, res) {
 res.render('register', { });
 });

 router.post('/register', function(req, res, next) {
 Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
 if (err) {
 return res.render("register", {info: "Sorry. That username already exists. Try again."});
 }

 passport.authenticate('local')(req, res, function () {
 req.session.save(function (err) {
 if (err) {
 return next(err);
 }
 res.redirect('/');
 });
 });
 });
 });
 */


router.get('/', function (req, res) {
  res.redirect('/admin/login');
});


router.get('/login', function (req, res) {
  res.render('admin/login', {user: req.user});
});

router.post('/login', passport.authenticate('local'), function (req, res, next) {
  req.session.save(function (err) {
    if (err) {
      //return next(err);
      res.redirect('/admin/login');
    }
    res.redirect('/admin/main');
  });
});

router.get('/logout', function (req, res, next) {
  req.logout();
  req.session.save(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/admin/login');
  });
});


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/admin/login');
}

router.get('/main', isAuthenticated, function (req, res) {
  res.render('admin/main', {});
});


router.post('/search', isAuthenticated, function (req, res) {

  console.log(req.body);

  mongoPersister.retrieveReservationList(req.body, function (err, result) {

    console.log(err, result);

    res.json({
      status: 'OK',
      result: result
    });

  });

});

module.exports = router;