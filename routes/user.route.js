const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticateToken = require("../middleware/verifyUser.js");
const userController = require("../controllers/user.controller.js");
const limiter = require("../middleware/rateLimiter.js");

router.get("/profile", limiter, authenticateToken, userController.getUserData);
router.get(
  "/getAllUsers",
  limiter,
  authenticateToken,
  userController.getAllUsers
);

module.exports = router;
