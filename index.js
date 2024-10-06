const express = require("express");
const app = express();
const port = 3000;
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser"); // Import cookie-parser
const { handleError } = require("./middleware/error.js"); // Import your error handling middleware
const logger = require("./middleware/logging.js");
require("dotenv").config();
app.use(cookieParser());
app.use(bodyParser.json());
app.use(logger);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("hello world");
});
app.use(handleError);
app.all("*", (req, res) => {
  res.send("Invalid route");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
