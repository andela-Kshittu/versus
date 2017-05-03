var FacebookStrategy = require('passport-facebook').Strategy;
var { User } = require('../models/user');

module.exports = function(passport) {

  passport.use(new FacebookStrategy({
      clientID: process.env.FB_APP_ID,
      clientSecret: process.env.FB_APP_SECRET,
      callbackURL: process.env.FB_CALLBACK_URL,
      profileFields: ['id', 'first_name', 'last_name', 'email']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'facebook.id': profile.id }, function(err, user) {
        if (!user) {
          User.findOne({ 'email': profile._json.email }, function(err, userData) {
            if (!userData) {
              // if there is no user with that email
              // create the user
              var newUser = new User();

              newUser.email = profile._json.email;
              newUser.facebook = { id: profile._json.id };
              newUser.firstname = profile._json.first_name;
              newUser.lastname = profile._json.last_name;

              // save the user
              newUser.save(function(err) {
                if (err) {
                  console.log('Error in Saving user: ' + err);
                  throw err;
                }
                console.log('User Facebook Registration succesful');
                return done(null, newUser);
              });
            } else {

              // if user already exist, update the id field and return existing user
              User.findOneAndUpdate({ '_id': userData.id }, { $set: { 'facebook.id': profile.id } }, { new: true }).lean()
                .then((updatedUser) => {
                  return done(null, updatedUser);
                }).catch((e) => {
                  res.status(500).send()
                });
            }
          });
        } else {
          return done(null, user);
        }
      });
    }
  ));
}
