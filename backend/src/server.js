const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");

const connectToDatabase = require("./database/mongoose");
const pets = require("./routes/petRoute");
const user = require("./routes/authRoute");
const errorHandler = require("./util/errorHandler");

dotenv.config();

const app = express();

let requestCount = 0;

// Middleware
app.use(cors()); // Add this line to enable CORS
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes

app.use("/uploads", express.static("uploads"));
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

    process.on("SIGTERM", () => {
      console.log("SIGTERM signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("SIGINT signal received: closing HTTP server");
      server.close(() => {
        console.log("HTTP server closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

createServer();

module.exports = app;
