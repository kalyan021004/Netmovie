const express = require("express");
const Movie = require("../models/movie.models");
const router = express.Router();
const { isOwner } = require("../middleware");

// All movies
router.get("/movies", async (req, res) => {
  const allMovies = await Movie.find({});
  res.render("movies/index", { allMovies });
});

// Add new movie form
router.get("/movies/new", isOwner, (req, res) => {
  res.render("movies/new");
});

// Create new movie
router.post("/movies", isOwner, async (req, res) => {
  try {
    const { title, year, genre, description, videoUrl, thumbnailUrl } = req.body;
    const newMovie = new Movie({ title, year, genre, description, videoUrl, thumbnailUrl });
    await newMovie.save();
    res.redirect("/movies");
  } catch (e) {
    console.error(e);
    res.status(500).send("Error creating movie");
  }
});

// Show movie details
router.get("/movies/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
res.render("movies/show", {
    movie,
    currentUserId: req.session.userId,
    currentUserIsAdmin: req.session.isAdmin,  // Assuming you store admin flag here
  });});

// Edit movie form
router.get("/movies/:id/edit", isOwner, async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id);
  res.render("movies/edit.ejs", { movie });
});

// Update movie
router.put("/movies/:id", isOwner, async (req, res) => {
  const { id } = req.params;
  const { title, year, genre, description, videoUrl, thumbnailUrl } = req.body;
  await Movie.findByIdAndUpdate(id, { title, year, genre, description, videoUrl, thumbnailUrl }, { runValidators: true });
  res.redirect(`/movies/${id}`);
});

// Delete movie
router.delete("/movies/:id", isOwner, async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/movies");
});

module.exports = router;
