var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.status(401).send({status:"Authentication required."});
}

module.exports = function(passport) {
	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.send({ user: req.user});
	});

	return router;
}
