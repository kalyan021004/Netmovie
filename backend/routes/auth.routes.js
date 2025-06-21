const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/user.models");

// === Render Signup Form ===
router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

// === Render Signin Form ===
router.get("/signin", (req, res) => {
  res.render("auth/signin");
});

// === Handle Signup ===
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already registered.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    req.session.userId = newUser._id; // auto-login after signup
    res.redirect("/signin");
  } catch (err) {
    console.error(err);
    res.status(500).send("Signup failed");
  }
});

// === Handle Signin ===
router.post("/signin", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send("Invalid username or password.");
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).send("Invalid username or password.");
    }

    req.session.userId = user._id;
    res.redirect("/movies");
  } catch (err) {
    console.error(err);
    res.status(500).send("Login failed");
  }
});

// === Handle Logout ===
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

module.exports = router;
