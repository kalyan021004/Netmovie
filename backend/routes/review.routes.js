const express = require("express");
const Movie = require("../models/movie.models");
const Review = require("../models/review.models");
const { isLoggedIn, isReviewAuthor, validateReview } = require("../middleware");

const router = express.Router({ mergeParams: true }); // Important to access :id from parent route

// Create Movie Review Route
router.post("/", isLoggedIn, validateReview, async (req, res, next) => {
  try {
    const { id } = req.params; // Movie ID
    const movie = await Movie.findById(id);

    if (!movie) {
      req.flash("error", "Movie not found.");
      return res.redirect("/movies");
    }

    // Create review with form data
    const review = new Review(req.body.review);
    review.author = req.session.userId; // Set current user as author
    review.movie = id; // Set movie reference
    await review.save();

    // Add review to movie and save
    movie.reviews.push(review);
    await movie.save();

    req.flash("success", "Movie review added successfully!");
    res.redirect(`/movies/${id}`);
  } catch (err) {
    next(err); // Pass error to error handler middleware
  }
});

// Delete Movie Review Route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, async (req, res, next) => {
  try {
    const { id, reviewId } = req.params;

    // Remove review ID from movie reviews array
    await Movie.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });

    // Delete the review document itself
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Movie review deleted successfully!");
    res.redirect(`/movies/${id}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;