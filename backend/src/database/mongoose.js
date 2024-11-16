const mongoose = require("mongoose");
const dotenv = require("dotenv");
const performanceNow = require("performance-now");

dotenv.config();

const connectDB = async () => {
  const start = performanceNow();
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      minPoolSize: 10,
      maxPoolSize: 100,
    });
    const end = performanceNow();
    console.log(
      `MongoDB connection established in ${(end - start).toFixed(2)} ms`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
