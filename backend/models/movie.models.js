const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const movieSchema = new Schema(
  {
    title: String,
    year: Number,

    description: String,
    genre: String,

    videoUrl: String,
    thumbnailUrl: String,
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }]

  }
)
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;