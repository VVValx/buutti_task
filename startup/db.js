const mongoose = require("mongoose");

module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/playground");
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database");
  }
};
