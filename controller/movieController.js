const mongoose = require("mongoose");

const movieSchema = require("../model/movieSchema");

module.exports = {
  searchMovies: (req, res) => {
    const Movie = mongoose.model("movie", movieSchema);
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
};
