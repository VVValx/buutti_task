const express = require("express");
const app = express();
require("express-async-errors");
require("dotenv").config(); //for env variables
require("./startup/db")(); //database
require("./startup/routes")(app); //for calling all routes

process.on("uncaughtException", (ex) => {
  console.log("Uncaught Exception", ex);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection", err);
  process.exit(1);
});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
