const bcrypt = require("bcryptjs/dist/bcrypt.js");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { error } = userModel.registerSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { username, password, email } = req.body;

    const newUser = await userModel.addUser(username, email, password);
    const { password: _, ...newUserData } = newUser;
    res
      .status(201)
      .json({ message: "User registered successfully", newUserData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error } = userModel.loginSchema.validate(req.body);
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
        expiresIn: "1h",
      }
    );

    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000), // expires in 1 hour
    });
    const { password: _, ...userData } = user; // do not include password in object returned
    res.status(200).json({ message: "Login successful", user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
};
