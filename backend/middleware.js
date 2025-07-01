const Movie = require("./models/movie.models");
const Review = require("./models/review.models");

// Check if user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("error", "You must be logged in to perform this action.");
    return res.redirect("/login");
  }
  next();
};

// Check if user is admin (owner permissions)
module.exports.isOwner = async (req, res, next) => {
  if (res.locals.currentUserIsAdmin) {
    return next();
  }
  return res.status(403).send("You do not have permission - Admins only");
};

// Check if user is the author of the review
module.exports.isReviewAuthor = async (req, res, next) => {
  try {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);
    
    if (!review) {
      req.flash("error", "Review not found.");
      return res.redirect("/movies");
    }
    
    // Check if user is the author of the review or is an admin
    if (!review.author.equals(req.session.userId) && !res.locals.currentUserIsAdmin) {
      req.flash("error", "You don't have permission to perform this action.");
      return res.redirect(`/movies/${req.params.id}`);
    }
    
    next();
  } catch (err) {
    req.flash("error", "Something went wrong.");
    return res.redirect("/movies");
  }
};

// Check if user is the owner of the movie (for movie CRUD operations)
module.exports.isMovieOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      req.flash("error", "Movie not found.");
      return res.redirect("/movies");
    }
    
    // Check if user is the owner of the movie or is an admin
    if (!movie.owner.equals(req.session.userId) && !res.locals.currentUserIsAdmin) {
      req.flash("error", "You don't have permission to perform this action.");
      return res.redirect(`/movies/${id}`);
    }
    
    next();
  } catch (err) {
    req.flash("error", "Something went wrong.");
    return res.redirect("/movies");
  }
};

// Validate movie data
module.exports.validateMovie = (req, res, next) => {
  const { title, description, genre, releaseDate, duration, director } = req.body.movie;
  
  if (!title || !description || !genre || !releaseDate || !duration || !director) {
    req.flash("error", "Please fill in all required fields.");
    return res.redirect("back");
  }
  
  if (duration <= 0) {
    req.flash("error", "Duration must be a positive number.");
    return res.redirect("back");
  }
  
  next();
};

// Validate review data
module.exports.validateReview = (req, res, next) => {
  const { body, rating } = req.body.review;
  
  if (!body || !rating) {
    req.flash("error", "Please provide both review text and rating.");
    return res.redirect("back");
  }
  
  if (rating < 1 || rating > 5) {
    req.flash("error", "Rating must be between 1 and 5.");
    return res.redirect("back");
  }
  
  next();
};

// Set current user in locals for templates
module.exports.setCurrentUser = (req, res, next) => {
  res.locals.currentUser = req.session.userId || null;
  res.locals.currentUserIsAdmin = req.session.isAdmin || false;
  next();
};