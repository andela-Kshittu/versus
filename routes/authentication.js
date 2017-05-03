var express = require('express');
var router = express.Router();

module.exports = function(passport){

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: 'api/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/api/home',
		failureRedirect: '/',
		failureFlash : true
	}));

	router.get('/facebook', passport.authenticate('facebook', {scope: 'public_profile,email'}));

	router.get('/facebook/callback', passport.authenticate('facebook', { 
	  	successRedirect: '/api/home',
	  	failureRedirect: '/' 
	  }));


	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.send({status:'success'});
	});
	return router;
}
