const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MongoStore = require("connect-mongo");
const movieRoutes=require("./routes/movie.routes")
const authRoutes=require("./routes/auth.routes");
const profileRoutes=require("./routes/profile.routes")
require('dotenv').config();
const User = require("./models/user.models"); // Add this at the top of your file

const app = express();
const MONGO_URL =process.env.MONGO_URL ;
const SESSION_SECRET = process.env.SESSION_SECRET || "defaultSecret";

const PORT = process.env.PORT || 8080;

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URL,
      touchAfter: 24 * 3600, // time period in seconds to update session only if changed (optional)
      crypto: {
        secret: SESSION_SECRET, // encrypt session data in DB (optional)
      },
    }),
    cookie: {
      httpOnly: true,
      // secure: true, // uncomment this if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week in milliseconds
    },
  })
);

app.use(flash());
app.use(async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user;
      res.locals.currentUserIsAdmin = user?.isAdmin || false;
    } catch (err) {
      console.error("User fetch failed:", err);
      res.locals.currentUser = null;
      res.locals.currentUserIsAdmin = false;
    }
  } else {
    res.locals.currentUser = null;
    res.locals.currentUserIsAdmin = false;
  }

  next();
});
app.use(async (req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");

  if (req.session.userId) {
    try {
      const user = await User.findById(req.session.userId);
      res.locals.currentUser = user;
      res.locals.currentUserIsAdmin = user?.isAdmin || false;
    } catch (err) {
      console.error("User fetch failed:", err);
      res.locals.currentUser = null;
      res.locals.currentUserIsAdmin = false;
    }
  } else {
    res.locals.currentUser = null;
    res.locals.currentUserIsAdmin = false;
  }

  next();
});

mongoose.connect(MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/",movieRoutes);
app.use("/",authRoutes)
app.use("/",profileRoutes)

app.get("/",(req,res)=>{
    res.render("main.ejs")
})
app.listen(PORT, () => {
  console.log("Server listening on port 8080");
});
