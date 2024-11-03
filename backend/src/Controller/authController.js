const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const tokenBlacklist = require("../util/tokenBlacklist");

const register = async (req, res, next) => {
  const User = require("../model/userSchema");
  const { email, password, firstName, lastName } = req.body;

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
};

const login = async (req, res, next) => {
  const User = require("../model/userSchema");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("Login failed");
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful");
    res.json({ message: "Login successful", token });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    tokenBlacklist.add(token);
  }

  console.log("Logged out successfully");

  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = { register, login, logout };
