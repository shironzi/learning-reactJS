const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");

const connectToDatabase = require("./database/mongoose");
const pets = require("./routes/petRoute");
const user = require("./routes/authRoute");
const errorHandler = require("./util/errorHandler");
const authenticateToken = require("./middleware/authenticateToken");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
// app.use(morgan("combined")); // Log HTTP requests
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Serve static files with CORS headers
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

// Error handler
app.use(errorHandler);

const createServer = async () => {
  try {
    const port = process.env.PORT || 5000;

    await connectToDatabase();
    const server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createServer();

module.exports = app;
