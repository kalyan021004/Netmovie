const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }
  ],
  watchlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Movie"
    }
  ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;
