const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
//const jwt = require("jsonwebtoken");
const SALT_I = 10;
const config = require("../config");

const eventSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    unique: 1
  },
  Address: {
    type: String,
    require: true
  },
  Category: {
    type: String,
    reuire: true
  },
  username: {
    type: String,
    require: true,
    trim: true
  },
  userid: {
    type: String,
    require: true,
    trim: true
  },
  eventDate: {
    type: String,
    require: true
  },
  eventTime: {
    type: String,
    reqire: true
  },
  description: {
    type: String,
    require: true
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
