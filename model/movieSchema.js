const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  episodes: [{ seasonNumber: Number, episodeName: String }],
});

module.exports = movieSchema;
