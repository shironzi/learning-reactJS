const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./database/mongoose");
const router = require("./routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const createServer = async () => {
  try {
    const port = process.env.PORT || 5000;

    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

app.use("/", router);

createServer();

module.exports = app;
