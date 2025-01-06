const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userControllers = require("../controllers/user.controller");

router.post(
  "/register",
  [
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be at least 3 characters long"),
    body("email")
      .isLength({ min: 6 })
      .withMessage("Email must be at least 6 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],

  userControllers.registerUser
);

module.exports = router;
