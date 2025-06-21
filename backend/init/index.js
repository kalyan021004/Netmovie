const mongoose = require("mongoose");
const initData = require("./data.js");
const Movie = require("../models/movie.models.js"); 
require("dotenv").config();

const MONGO_URL =process.env.MONGO_URL ;

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    initDB();  // Call initDB only after connection
  })
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  try {
    await Movie.deleteMany({});
    await Movie.insertMany(initData.data);
    console.log("data was initialized");
    process.exit();  // Exit after initialization (optional)
  } catch (error) {
    console.error("Error initializing DB:", error);
    process.exit(1);
  }
};
