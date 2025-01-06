const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResults } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const error = validationResults(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { firstname, lastname, email, password } = req.body;

  const hashPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  const token=-user.generateAuthToken();
  res.status(201).json({ user, token });

};
