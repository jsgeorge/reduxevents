import express from "express";
import Event from "../models/events";
import authenticate from "../../middleware/authenticate";

let router = express.Router();

router.get("/", (req, res) => {
  Event.find({}, (err, events) => {
    if (err) return res.status(400).send(err);
    return res.status(200).send(events);
  });
});

router.post("/", authenticate, (req, res) => {
  console.log(req.body);
  const event = new Event(req.body);

  //res.status(201).json({ success: true });
  Event.findOne({ name: req.body.name }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.status(422).send({ err: "Event already exists" });
    }

    event.save(function(err) {
      if (err) {
        return next(err);
      }
      res.status(200).json({ success: true });
    });
  });
});

export default router;
