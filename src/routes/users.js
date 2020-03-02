import express from "express";
import bcrypt from "bcrypt";
const jwt = require("jwt-simple");
import config from "../config";

import User from "../models/users";

let router = express.Router();

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

router.post("/", (req, res) => {
  console.log(req.body);
  const { email, password, username, timezone } = req.body;
  const password_digest = bcrypt.hashSync(password, 10);
  const user = new User({
    email: email,
    password: password_digest,
    username: username,
    timezone: timezone
  });

  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ err: "Email already in use" });
    }

    user.save(function(err) {
      if (err) {
        return next(err);
      }
      res.json({
        token: tokenForUser(user)
      });
    });
  });
});

router.get("/", (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(users);
  });
});

export default router;
