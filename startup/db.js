const mongoose = require("mongoose");
const logger = require("../logger");
module.exports = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/playground");
    logger.info("Connected to database");
  } catch (error) {
    logger.error("Error connecting to database");
  }
};
