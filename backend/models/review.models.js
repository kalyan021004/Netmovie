const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieReviewSchema = new Schema({
  body: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie: {
    type: Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  }
}, { timestamps: true });

const Review = mongoose.model("Review", movieReviewSchema);

module.exports = Review;