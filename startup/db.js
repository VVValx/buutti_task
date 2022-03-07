const mongoose = require("mongoose");
const logger = require("../logger");
module.exports = async () => {
  try {
    await mongoose.connect(process.env.DB);
    logger.info("Connected to database");
  } catch (error) {
    logger.error("Error connecting to database");
  }
};
