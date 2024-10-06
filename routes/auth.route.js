const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticateToken = require("../middleware/verifyUser.js");
const userController = require("../controllers/user.controller.js");
const limiter = require("../middleware/rateLimiter.js");

router.post("/register", limiter, userController.register);
router.post("/login", limiter, userController.login);
router.get("/profile", limiter, authenticateToken, userController.getUserData);

module.exports = router;
