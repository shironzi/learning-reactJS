const dotenv = require("dotenv");
dotenv.config();

const app = require("./server");
const connectToDatabase = require("./database/mongoose");

const startServer = async () => {
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

startServer();
