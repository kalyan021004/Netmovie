const express = require("express");
const Movie = require("../models/movie.models");
const router = express.Router();
const { isOwner } = require("../middleware");
const escapeRegExp = require("lodash.escaperegexp");

// Combined route: All movies + Search functionality
router.get("/movies", async (req, res) => {
  try {
    const query = req.query.search;
    
    // If there's a search query
    if (query && query.trim() !== "") {
      const movies = await Movie.find({
        $or: [
          { title: { $regex: escapeRegExp(query.trim()), $options: "i" } },
          { genre: { $regex: escapeRegExp(query.trim()), $options: "i" } },
          { description: { $regex: escapeRegExp(query.trim()), $options: "i" } }
        ]
      });
      
      return res.render("movies/index", { 
        allMovies: movies, 
        search: query.trim(),
        searchPerformed: true 
      });
    }
    
    // If no search query, show all movies
    const allMovies = await Movie.find({});
    res.render("movies/index", { 
      allMovies, 
      search: "",
      searchPerformed: false 
    });
    
  } catch (error) {
    console.error("Error in movies route:", error);
    res.status(500).send("Error loading movies");
  }
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
  try {
    const { id } = req.params;
   const movie = await Movie.findById(id)
  .populate({
    path: "reviews",
    populate: { path: "author", select: "username profileImage" }
  });

    
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    
    res.render("movies/show", {
      movie,
      currentUserId: req.session.userId,
      currentUserIsAdmin: req.session.isAdmin,
    });
  } catch (error) {
    console.error("Error finding movie:", error);
    res.status(500).send("Error loading movie");
  }
});

// Edit movie form
router.get("/movies/:id/edit", isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    
    res.render("movies/edit.ejs", { movie });
  } catch (error) {
    console.error("Error finding movie for edit:", error);
    res.status(500).send("Error loading movie for editing");
  }
});

// Update movie
router.put("/movies/:id", isOwner, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, genre, description, videoUrl, thumbnailUrl } = req.body;
    
    await Movie.findByIdAndUpdate(
      id, 
      { title, year, genre, description, videoUrl, thumbnailUrl }, 
      { runValidators: true }
    );
    
    res.redirect(`/movies/${id}`);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).send("Error updating movie");
  }
});

// Delete movie
router.delete("/movies/:id", isOwner, async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).send("Error deleting movie");
  }
});

// Home route
router.get("/home", async (req, res) => {
  try {
    const featuredMovies = await Movie.find({}).limit(6);
    res.render("movies/home", { featuredMovies });
  } catch (error) {
    console.error("Error loading home page:", error);
    res.status(500).send("Error loading home page");
  }
});

module.exports = router;