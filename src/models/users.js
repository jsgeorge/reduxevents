const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
//const jwt = require("jsonwebtoken");
const SALT_I = 10;
const config = require("../config");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  username: {
    type: String,
    require: true,
    trim: true,
    unique: 1
  },
  timezone: {
    type: String,
    trim: true
  }
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};
userSchema.statics.findByToken = function(token, cb) {
  var user = this;

  jwt.verify(token, config.secret, function(err, decode) {
    user.findOne({ _id: decode, token: token }, function(err, user) {
      if (err) return cb(err);
      cb(null, user);
    });
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
