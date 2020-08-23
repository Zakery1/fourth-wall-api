const express = require("express");
const app = express();
var cors = require("cors");

const mongoose = require("mongoose");
const userSchema = require("./userSchema.js");

app.options("*", cors());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

let connectionSource = process.env.MONGO_URL || "mongodb://localhost/test";

mongoose.connect(connectionSource, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

const User = mongoose.model("user", userSchema, "user");

const luka = new User({ name: 'Luka' });

luka.save(function (err, luka) {
  if (err) return console.error(err);
});



app.get("/", (req, res) => {
  User.find((err, users) => {
    if (err) return console.error(err);
    res.send((users));
  });

});

app.listen(process.env.PORT || 8080, function () {
  console.log("server running on port 8080");
});
