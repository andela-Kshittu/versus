var express = require('express');
var router = express.Router();

module.exports = function(passport) {

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', {
    successRedirect: '/api/success',
    failureRedirect: '/api/failure',
    failureFlash: true
  }));

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/api/success',
    failureRedirect: '/api/failure',
    failureFlash: true
  }));

  /* Handle Facebook login */
  router.get('/facebook', passport.authenticate('facebook', { scope: 'public_profile, email' }));

  /* Facebook login callback url */
  router.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/api/success',
    failureRedirect: '/api/failure'
  }));

  /* Handle Google login */
  router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

  /* Google login callback url */
  router.get('/google/callback', passport.authenticate('google', {
    successRedirect: '/api/success',
    failureRedirect: '/api/failure'
  }));

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.send({ status: 'success' });
  });
  return router;
}
