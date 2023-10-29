const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error while DB connection : ${error.message}`.bgRed.white);
    process.exit();
  }
};

module.exports = connectDB;
