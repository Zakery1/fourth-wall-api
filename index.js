const express = require("express");
const app = express();
var cors = require("cors");

const mongoose = require("mongoose");

const movieController = require('./controller/movieController');

const userSchema = require("./model/userSchema.js");


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

const User = mongoose.model("user", userSchema);


// const luka = new User({ name: 'Luka' });

// const uncutGems = new Movie({
//   name: "Uncut Gems",
//   episodes: [
//     {
//       seasonNumber: 2,
//       episodeName:
//         "The Invisible Man, Parasite, Uncut Gems, Good Night and Good Luck, Circle",
//     },
//     {
//       seasonNumber: 2,
//       episodeName:
//         "Tenet Release Delayed, Top 10 Movies of the Decade, Tampopo and 12 O’Clock High",
//     },
//   ],
// });

// Start function
// const searchTerms = "Un";
// async function lookUp(st) {
//   const newReg = new RegExp(st, 'i')
//   const myResult = await Movie.find({ name: newReg }, "name").exec();
//   console.log(myResult);
// }

// Call start
// lookUp(searchTerms);

app.get("/api/movie/search", movieController.searchMovies);

app.get("/", (req, res) => {
  res.send("welcome to the Stage 18 Podcast");
});

app.listen(process.env.PORT || 8080, function () {
  console.log("server running on port 8080");
});
