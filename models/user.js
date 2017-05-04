const mongoose = require('mongoose');
const validator = require('validator');
const _ = require('lodash');

let UserSchema = new mongoose.Schema({
  facebook: {
    id: String
  },
  google: {
    id: String
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    minlength: 6,
    validate: {
      validator: validator.isEmail,
      message: `{VALUE} email is not valid`
    }
  },
  password: {
    type: String,
    minlength: 6
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  }
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();
  return _.pick(userObject, ['_id', 'email', 'firstname', 'lastname']);
};

let User = mongoose.model('User', UserSchema);

module.exports = { User };
