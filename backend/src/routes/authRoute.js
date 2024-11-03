const express = require("express");

const { Register, Login } = require("../Controller/authController");
const {
  registerValidator,
  loginValidation,
} = require("../validator/inputValidator");

const router = express.Router();

// Route for Register
router.post("/register", registerValidator, Register);

// Route for Login
router.post("/login", loginValidation, Login);

module.exports = router;
