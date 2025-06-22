const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.models');
const { isLoggedIn } = require('../middleware/auth');

// Profile view
router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    res.render('profile/view', { user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Profile edit form
router.get('/profile/edit', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    res.render('profile/edit', { user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Profile edit submit
router.post('/profile/edit', isLoggedIn, async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId, 
      { username, email }, 
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    req.flash('success', 'Profile updated successfully');
    res.redirect('/profile');
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      req.flash('error', 'Please check your input data');
    } else {
      req.flash('error', 'Failed to update profile');
    }
    res.redirect('/profile/edit');
  }
});

// Settings view
router.get('/profile/settings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    res.render('profile/settings', { user });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// Settings save
router.post('/profile/settings', isLoggedIn, async (req, res, next) => {
  try {
    const { emailNotifications } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.session.userId, 
      { emailNotifications: emailNotifications === 'on' },
      { new: true }
    );
    if (!updatedUser) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    req.flash('success', 'Settings saved successfully');
    res.redirect('/profile/settings');
  } catch (err) {
    console.error(err);
    req.flash('error', 'Failed to save settings');
    res.redirect('/profile/settings');
  }
});

/// Favorites list
router.get('/profile/favorites', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).populate('favorites');
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    res.render('profile/favorites', { 
      favorites: user.favorites || [],
      user: user 
    });
  } catch (err) {
    console.error('Error fetching favorites:', err);
    req.flash('error', 'Failed to load favorites');
    res.redirect('/profile');
  }
});

// Watchlist list
router.get('/profile/watchlist', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId).populate('watchlist');
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    res.render('profile/watchlist', { 
      watchlist: user.watchlist || [],
      user: user 
    });
  } catch (err) {
    console.error('Error fetching watchlist:', err);
    req.flash('error', 'Failed to load watchlist');
    res.redirect('/profile');
  }
});

// Add to favorites
router.post('/profile/favorites/:movieId', isLoggedIn, async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      req.flash('error', 'Invalid movie ID');
      return res.redirect('/profile/favorites');
    }

    const objectId = new mongoose.Types.ObjectId(movieId);
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    // Initialize favorites array if it doesn't exist
    if (!user.favorites) {
      user.favorites = [];
    }

    if (!user.favorites.some(fav => fav.equals(objectId))) {
      user.favorites.push(objectId);
      await user.save();
      req.flash('success', 'Added to favorites!');
    } else {
      req.flash('info', 'Already in favorites!');
    }
    
    res.redirect('/profile/favorites');
  } catch (err) {
    console.error('Error adding to favorites:', err);
    req.flash('error', 'Failed to add to favorites');
    res.redirect('/profile/favorites');
  }
});

// Remove from favorites
router.delete('/profile/favorites/:movieId', isLoggedIn, async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      req.flash('error', 'Invalid movie ID');
      return res.redirect('/profile/favorites');
    }

    const result = await User.findByIdAndUpdate(
      req.session.userId, 
      { $pull: { favorites: movieId } },
      { new: true }
    );
    
    if (!result) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    
    req.flash('success', 'Removed from favorites');
    res.redirect('/profile/favorites');
  } catch (err) {
    console.error('Error removing from favorites:', err);
    req.flash('error', 'Failed to remove from favorites');
    res.redirect('/profile/favorites');
  }
});

// Add to watchlist
router.post('/profile/watchlist/:movieId', isLoggedIn, async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      req.flash('error', 'Invalid movie ID');
      return res.redirect('/profile/watchlist');
    }

    const objectId = new mongoose.Types.ObjectId(movieId);
    const user = await User.findById(req.session.userId);
    
    if (!user) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }

    // Initialize watchlist array if it doesn't exist
    if (!user.watchlist) {
      user.watchlist = [];
    }

    if (!user.watchlist.some(watch => watch.equals(objectId))) {
      user.watchlist.push(objectId);
      await user.save();
      req.flash('success', 'Added to watchlist!');
    } else {
      req.flash('info', 'Already in watchlist!');
    }
        res.redirect(`/movies/${movieId}`);

  } catch (err) {
    console.error('Error adding to watchlist:', err);
    req.flash('error', 'Failed to add to watchlist');
    res.redirect('/profile/watchlist');
  }
});

// Remove from watchlist
router.delete('/profile/watchlist/:movieId', isLoggedIn, async (req, res, next) => {
  try {
    const movieId = req.params.movieId;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      req.flash('error', 'Invalid movie ID');
      return res.redirect('/profile/watchlist');
    }

    const result = await User.findByIdAndUpdate(
      req.session.userId, 
      { $pull: { watchlist: movieId } },
      { new: true }
    );
    
    if (!result) {
      req.flash('error', 'User not found');
      return res.redirect('/login');
    }
    
    req.flash('success', 'Removed from watchlist');
    res.redirect('/profile/watchlist');
  } catch (err) {
    console.error('Error removing from watchlist:', err);
    req.flash('error', 'Failed to remove from watchlist');
    res.redirect('/profile/watchlist');
  }
});

module.exports = router;