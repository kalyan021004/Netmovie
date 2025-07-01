const express = require('express');
const router = express.Router();
const User = require('../models/user.models');

// Add movie to watchedMovies
router.post('/movie/:id/watch', async (req, res) => {
  try {
    const userId = req.user._id; // assuming user is authenticated and req.user is set
    const movieId = req.params.id;

    await User.findByIdAndUpdate(userId, {
      $addToSet: { watchedMovies: movieId }
    });

    res.status(200).json({ message: 'Movie added to watched list' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle like/unlike movie
router.post('/movie/:id/like', async (req, res) => {
  try {
    const userId = req.user._id;
    const movieId = req.params.id;

    const user = await User.findById(userId);

    if (user.likedMovies.includes(movieId)) {
      // Remove from likedMovies
      user.likedMovies.pull(movieId);
      await user.save();
      return res.status(200).json({ message: 'Movie unliked' });
    } else {
      // Add to likedMovies
      user.likedMovies.push(movieId);
      await user.save();
      return res.status(200).json({ message: 'Movie liked' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
