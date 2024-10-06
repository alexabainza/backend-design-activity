const express = require("express");
const app = express();
require("dotenv").config();

// IMPORT LIBRARIES
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT;

// IMPORT SELF DEFINED MODULES
const { handleError } = require("./middleware/error.js");
const logger = require("./middleware/logging.js");
const authRoutes = require("./routes/auth.route.js");
const userRoutes = require("./routes/user.route.js");
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

app.use(logger);
app.use(handleError);

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("hello world");
});

//CATCH INVALID ROUTES
app.all("*", (req, res) => {
  res.send("Invalid route");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
