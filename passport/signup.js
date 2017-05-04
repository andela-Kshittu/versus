const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/user');
const bCrypt = require('bcrypt-nodejs');

module.exports = (passport) => {

  passport.use('signup', new LocalStrategy({
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
      findOrCreateUser = () => {
        // find a user in Mongo with provided email
        console.log("email is : " + email + " - pword is : " + password + " - req is : " + req.body.firstname);
        User.findOne({ 'email': email }, (err, user) => {
          // In case of any error, return using the done method
          if (err) {
            console.log('Error in SignUp: ' + err);
            return done(err);
          }
          // already exists
          if (user) {
            console.log('User already exists with email: ' + email);
            req.flash('status', 409);
            return done(null, false, req.flash('message', 'User Already Exists'));
          }
          // if there is no user with that email
          // create the user
          let newUser = new User();

          // set the user's local credentials
          newUser.email = email;
          newUser.password = createHash(password);
          newUser.firstname = req.body.firstname;
          newUser.lastname = req.body.lastname;

          // save the user
          newUser.save((err) => {
            if (err) {
              console.log('Error in Saving user: ' + err);
              throw err;
            }
            console.log('User Registration succesful');
            return done(null, newUser);
          });
        });
      };
      // Delay the execution of findOrCreateUser and execute the method
      // in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));

  // Generates hash using bCrypt
  const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  }

}
