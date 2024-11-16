const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

const errorHandler = require("./util/errorHandler");
const authenticateToken = require("./middleware/authenticateToken");
const pets = require("./routes/petRoute");
const user = require("./routes/authRoute");
const admin = require("./routes/adminRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow CORS for all routes
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Serve static files from the uploads folder
app.use(
  "/uploads",
  express.static("uploads", {
    maxAge: "1d",
  })
);

// Authenticate token for all routes except /auth/login and /auth/register
app.use((req, res, next) => {
  if (req.path === "/auth/login" || req.path === "/auth/register") {
    return next();
  }
  authenticateToken(req, res, next);
});

// Routes
app.use("/", pets);
app.use("/auth", user);
app.use("/admin", admin);

// Error handler
app.use(errorHandler);

module.exports = app;
