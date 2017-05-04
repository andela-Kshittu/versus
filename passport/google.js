var GoogleStrategy = require('passport-google-oauth20').Strategy;
var { User } = require('../models/user');

module.exports = (passport) => {
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL
    },
    (accessToken, refreshToken, profile, done) => {
      console.log("##### google profile : " + JSON.stringify(profile));
      User.findOne({ 'google.id': profile.id }, (err, user) => {
        if (!user) {
          User.findOne({ 'email': profile._json.emails[0].value }, (err, userData) => {
            if (!userData) {
              // if there is no user with that email
              // create the user
              let newUser = new User();

              newUser.email = profile._json.emails[0].value;
              newUser.google = { id: profile._json.id };
              newUser.firstname = profile._json.name.givenName;
              newUser.lastname = profile._json.name.familyName;

              // save the user
              newUser.save((err) => {
                if (err) {
                  console.log('Error in Saving user: ' + err);
                  throw err;
                }
                console.log('User Google Registration succesful');
                return done(null, newUser);
              });
            } else {
              // if user already exist, update the id field and return existing user
              User.findOneAndUpdate({ '_id': userData.id }, { $set: { 'google.id': profile.id } }, { new: true }).lean()
                .then((updatedUser) => {
                  return done(null, updatedUser);
                }).catch((e) => {
                  res.status(500).send()
                });
            }
          });
        }
        return done(null, user);
      });
    }
  ));
}
