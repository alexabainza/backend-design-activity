const rateLimit = require("express-rate-limit");

const WINDOWS_MS = 60 * 1000;
const MAX = 10;
// Create a rate limiter
const limiter = rateLimit({
  windowMs: WINDOWS_MS,
  max: MAX,
  message: {
    status: "error",
    statusCode: 429,
    message: "Too many requests, please try again later.",
  },
});

module.exports = limiter;
