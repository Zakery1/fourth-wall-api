//libary imports
const mongoose = require("mongoose");

//schema imports
const movieSchema = require("../model/movieSchema");

//schema declarations
const Movie = mongoose.model("movie", movieSchema);

module.exports = {
  searchMovies: (req, res) => {
    async function lookUp(searchTerm) {
      //remove surrounding whitespaces and extra whitespace between search terms
      searchTerm = searchTerm.replace(/\s+/g, " ").trim();
      const newReg = new RegExp(searchTerm, "i");
      const myResult = await Movie.find(
        { name: newReg },
        "name episodes"
      ).exec();
      res.send(myResult);
    }
    lookUp(req.query.movie);
  },
  addMovie: (req, res) => {
    const { name, episodes } = req.body;
    const additionToMovies = new Movie({ name: name, episodes: episodes });
    console.log(episodes)
    additionToMovies.save(function (err, additionToMovies) {
      if (err) return console.error(err);
    });
    res.send("hey");
  },
  getAllMovies: (req, res) => {
    async function getMovies() {
      const movies = await Movie.find().exec();
      res.send(movies);
    }
    getMovies();
  }
};
