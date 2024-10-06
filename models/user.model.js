const fs = require("fs");
const path = require("path");
const Joi = require("joi");
const bcrypt = require("bcryptjs");

const dataPath = path.join(__dirname, "../data/users.json");

const getUsers = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

const saveUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

// Define User Schema using Joi
const userRegistrationSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(), // Will be hashed later
  email: Joi.string().email().required(),
});

// Define User Schema using Joi for login
const userLoginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const users = getUsers();

const findByUsername = (username) => {
  return users.find((user) => user.username === username);
};

const findByEmail = (email) => {
  return users.find((user) => user.email === email);
};

const addUser = async (username, email, password) => {
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return Promise.reject(new Error("Username already exists"));
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    username,
    email,
    password: hashedPassword,
  };

  const { error } = userRegistrationSchema.validate({
    username,
    email,
    password: hashedPassword,
  });
  if (error) {
    throw new Error(`Validation error: ${error.details[0].message}`);
  }

  users.push(newUser);
  saveUsers(users);

  return newUser;
};

module.exports = {
  getUsers,
  saveUsers,
  addUser,
  findByUsername,
  findByEmail,
  userRegistrationSchema,
  userLoginSchema,
};
