const express = require("express");
const app = express();
var cors = require("cors");
const mongoose = require("mongoose");

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.options("*", cors());

var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL;

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 5000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, { useNewUrlParser: true, useUnifiedTopology: true  }, function (err, res) {
  if (err) {
    console.log("ERROR connecting to: " + uristring + ". " + err);
  } else {
    console.log("Succeeded connected to: " + uristring);
  }
});

var userSchema = new mongoose.Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  age: { type: Number, min: 0 }
});

var PUser = mongoose.model('PowerUsers', userSchema);
// Creating one user.
var johndoe = new PUser ({
  name: { first: 'John', last: '  Doe   ' },
  age: 25
});

// Saving it to the database.
johndoe.save(function (err) {if (err) console.log ('Error on save!')});

console.log(johndoe.name)


app.get("/", (req, res) => {
  res.send("hey");
});

app.listen(process.env.PORT || 8080, function () {
  console.log("server running on port 8080", "");
});
