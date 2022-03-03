const express = require("express");
const app = express();
const logger = require("./logger");
require("express-async-errors");
require("./startup/ex")(); // error logger outside express
require("dotenv").config(); //for env variables
require("./startup/db")(); //database
require("./startup/routes")(app); //for calling all routes

const port = process.env.PORT || 8000;
app.listen(port, () => logger.info(`Listening on port ${port}`));
