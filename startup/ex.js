const winston = require("winston");

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "logs/exceptions.log" })
  );

  process.on("unhandledRejection", (err) => {
    logger.add(
      new winston.transports.File({ filename: "logs/rejections.log" })
    );
    process.exit(1);
  });
};
