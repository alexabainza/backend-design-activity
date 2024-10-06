const express = require("express");
const router = express.Router({ mergeParams: true });
const authController = require("../controllers/auth.controller.js");

const limiter = require("../middleware/rateLimiter.js");

router.post("/register", limiter, authController.register);
router.post("/login", limiter, authController.login);

module.exports = router;
