const bcrypt = require("bcryptjs/dist/bcrypt.js");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { error } = userModel.userRegistrationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, email } = req.body;

    const newUser = await userModel.addUser(username, email, password);
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = userModel.userLoginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password } = req.body;

    const user = userModel.findByUsername(username);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token expiration time
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true, // Helps to prevent XSS attacks
      expires: new Date(Date.now() + 3600000), // 1 hour
    });
    const { password: _, ...userData } = user; // Exclude password
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUserData = (req, res) => {
  res.json({ message: "User data retrieved successfully", user: req.user });
};
module.exports = {
  register,
  login,
  getUserData,
};
