var express = require('express');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler 
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then return 401
  res.status(401).send({ status: "Authentication required." });
}

module.exports = function(passport) {
  //FIX ME : For testing redirect on success auth, should never make it to production
  router.get('/success', isAuthenticated, function(req, res) {
    res.send({ user: req.user });
  });

  //FIX ME : For testing redirect on success auth, should never make it to production
  router.get('/failure', function(err, req, res) {
    res.send(err);
  });

  return router;
}
