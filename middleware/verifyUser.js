const jwt = require("jsonwebtoken");
const { errorHandler } = require("./error.js");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token;
  //verify token
  if (!token) return next(errorHandler(401, "You need to be logged in"));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "Invalid Token"));
    req.user = user; //actually just the ID
    next(); //
  });
};

module.exports = authenticateToken;
