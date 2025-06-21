import mongoose from "mongoose";
import Movie from "../models/movie.models.js";  // adjust path if needed
import User from "../models/user.models.js";    // adjust path if needed

const MONGO_URL =process.env.MONGO_URL ;

const assignOwner = async () => {
  try {
    await mongoose.connect(MONGO_URL);

    // Find the user by email (change email as needed)
    const user = await User.findOne({ email: "kalyan021004@gmail.com" });

    if (!user) {
      console.log("User not found");
      return;
    }

    // Update all movies to have this user as owner
    const result = await Movie.updateMany({}, { owner: user._id });

    console.log(`All movies now assigned to: ${user.username}`);
    console.log(`Modified count: ${result.modifiedCount}`);

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error:", err);
  }
};

assignOwner();
