const express = require("express");
const cors = require("cors")({ origin: "*" });
const books = require("../routes/books");
const errorHandler = require("../middlewares/errorHandler");

module.exports = (app) => {
  app.use(cors);
  app.use(express.json());

  //routes
  app.use("/books", books);
  app.use(errorHandler); //Error handler middleware
};
