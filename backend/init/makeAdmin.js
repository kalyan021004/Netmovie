const mongoose = require("mongoose");
const User = require("../models/user.models"); // adjust path if needed
require("dotenv").config();

const MONGO_URL="mongodb+srv://kalyan021004:Netflix021004@netflix.hymtxye.mongodb.net/?retryWrites=true&w=majority&appName=Netflix";

async function makeAdmin(email) {
  await mongoose.connect(MONGO_URL);
  const user = await User.findOne({ email });
  if (!user) {
    console.log("User not found");
    process.exit(1);
  }
  user.isAdmin = true;
  await user.save();
  console.log(`${user.username} is now an admin.`);
  mongoose.disconnect();
}

makeAdmin("kalyan021004@gmail.com");
