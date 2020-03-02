import express from "express";
import bcrypt from "bcrypt";
const config = require("../config");
const jwt = require("jwt-simple");
//import jwt from "jsonwebtoken";

import User from "../models/users";

let router = express.Router();

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ id: user.id, username: user.username }, config.secret);
  // return jwt.sign(
  //   {
  //     id: user.id,
  //     username: user.username
  //   },
  //   config.secret
  // );
}

router.post("/", (req, res) => {
  const { identifier, password } = req.body;
  User.findOne({ email: identifier }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed, email not found"
      });
    user.comparePassword(password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Wrong password"
        });

      res.status(200).json({
        token: tokenForUser(user)
      });
    });
  });
});

export default router;
