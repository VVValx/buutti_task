const express = require("express");
const books = require("../routes/books");

module.exports = (app) => {
  app.use(express.json());

  //routes
  app.use("/books", books);
};
