const express = require("express");
const app = express();
require("dotenv").config(); //for env variables
require("./startup/db")(); //database
require("./startup/routes")(app);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));
