const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  registerValidator,
  loginValidator,
} = require("../validator/inputValidator");

const router = express.Router();

// Route for Register
router.post("/register", registerValidator, async (req, res, next) => {
  const User = require("../model/userSchema");
  try {
    const existingEmail = await User.findOne({ email });

    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

// Route for Login
router.post("/login", loginValidator, async (req, res, next) => {
  const User = require("../model/userSchema");
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
