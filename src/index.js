import express from "express";
import path from "path";
import bodyParser from "body-parser";
import mongoose from "mongoose";
//Routes
import users from "./routes/users";
import auth from "./routes/auth";
import events from "./routes/events";

const app = express();

//mongo DB
mongoose.connect(
  "mongodb://localhost:27017/auth" || "mongodb://localhost/react/auth"
);

app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/api/events", events);

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
