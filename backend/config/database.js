const mongoose = require("mongoose");
const dotenv = require("dotenv");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

const db = process.env.DB_URI;

const connectDatabase = async () => {
  try {
    await mongoose.connect(`${db}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Err : ", error.message);
    process.exit(1);
  }
};

module.exports = connectDatabase;
