const express = require("express");
const app = express();
var cors = require("cors");
const bodyParser = require('body-parser');

const mongoose = require("mongoose");

const movieController = require("./controller/movieController");

app.options("*", cors());

app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

app.use(bodyParser.json());

let connectionSource = process.env.MONGO_URL || "mongodb://localhost/test";

mongoose.connect(connectionSource, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

app.get("/api/movie/search", movieController.searchMovies);

app.get("api/movie/all", movieController.getAllMovies);

app.post("/api/movie/add", movieController.addMovie);

app.get("/", (req, res) => {
  res.send("welcome to the Stage 18 Podcast");
});

app.listen(process.env.PORT || 8080, function () {
  console.log("server running on port 8080");
});
