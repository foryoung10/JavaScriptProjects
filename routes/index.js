var express = require('express');
var router = express.Router();
var passport = require('passport');
//var Account = require('models/account.js');

/* GET home page. */
//router.get('/', function(req, res) {
 // res.render('index', { title: 'Express' });
//});

router.get('about', function(req, res) {
  //res.send('im the about page!');
  res.render('about',{});
});

router.get('/', function (req, res) {
  res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping', function(req, res){
  res.send("pong!", 200);
})



module.exports = router;