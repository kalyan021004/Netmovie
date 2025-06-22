// middleware/auth.js
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    req.flash("error", "You must be logged in.");
    return res.redirect("/signin");
  }
  next();
};

module.exports.isAdmin = (req, res, next) => {
  if (!req.session.userId || !req.session.isAdmin) {
    req.flash("error", "Admin access only.");
    return res.redirect("/");
  }
  next();
};
