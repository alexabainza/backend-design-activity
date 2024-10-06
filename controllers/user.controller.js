const userModel = require("../models/user.model.js");
const getUserData = async (req, res) => {
  try {
    const username = req.user.username;
    const user = await userModel.findByUsername(username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const { password: _, ...userData } = user; // exclude the password from the response
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user: userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllUsers = (req, res) => {
  try {
    const users = userModel.getUsers();
    const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
    res.status(200).json({ users: usersWithoutPasswords });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserData,
};
