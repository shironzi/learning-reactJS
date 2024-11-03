const express = require("express");

const { register, login, logout } = require("../Controller/authController");
const {
  registerValidator,
  loginValidation,
} = require("../validator/inputValidator");

const router = express.Router();

// Route for Register
router.post("/register", registerValidator, register);

// Route for Login
router.post("/login", loginValidation, login);

router.post("/logout", logout);

module.exports = router;
