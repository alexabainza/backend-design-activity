const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

const dataPath = path.join(__dirname, "../data/users.json");

// DEFINE SCHEMAS FOR INPUTS
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

// DEFINE FUNCTIONS
const getUsers = () => {
  const rawData = fs.readFileSync(dataPath);
  return JSON.parse(rawData);
};

const saveUsers = (users) => {
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
};

const users = getUsers();

//FOR LOGIN
const findByUsername = (username) => {
  return users.find((user) => user.username === username);
};

//FOR REGISTER
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

  const { error } = registerSchema.validate({
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
  registerSchema,
  loginSchema,
};
