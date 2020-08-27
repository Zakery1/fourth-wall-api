//libary imports
const mongoose = require("mongoose");

//schema imports
const movieSchema = require("../model/movieSchema");

//schema declarations
const Movie = mongoose.model("movie", movieSchema);

module.exports = {
  searchMovies: (req, res) => {
    async function lookUp(st) {
      const newReg = new RegExp(st, "i");
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
    additionToMovies.save(function (err, additionToMovies) {
      if (err) return console.error(err);
    });
    res.send("hey");
  },
};
