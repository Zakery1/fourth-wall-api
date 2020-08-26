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
    console.log(additionToMovies);

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

    // console.log(name, episodes);
    res.send("hey");
  },
};
