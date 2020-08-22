const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("db error", console.error.bind(console, "db connection error:"));

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());

let myCat = '';
db.once("open", function () {
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  const Kitten = mongoose.model("Kitten", kittySchema);

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens[0].name)
    myCat = kittens[0].name;
  });
});

app.get("/", (req, res) => {
  res.send(myCat);
});

app.listen(process.env.PORT || 8080, function () {
  console.log("server running on port 8080", "");
});
