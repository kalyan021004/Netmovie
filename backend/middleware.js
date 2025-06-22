const Movie = require("./models/movie.models");

module.exports.isOwner = async (req, res, next) => {
 if (res.locals.currentUserIsAdmin) {
    return next();
  }
  return res.status(403).send("You do not have permission - Admins only");
};
// middleware/auth.js
