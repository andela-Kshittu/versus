const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  facebook:{
    id:String
  },
  google:{
    id:String
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
    minlength:6,
    validate:{
      validator:validator.isEmail,
      message:`{VALUE} email is not valid`
    }
  },
  password:{
    type:String,
    minlength:6
  },
  firstname:{
    type:String,
    required:true
  },
  lastname:{
    type:String,
    required:true
  }},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'firstname', 'lastname']);
};

UserSchema.statics.findOrCreate = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;
  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        }else {
          reject();
        }
      });
    });
  });
};

var User = mongoose.model('User', UserSchema);

module.exports = {User};