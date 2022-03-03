const express = require("express");
const router = express.Router();
const Books = require("../models/books");

router.get("/", async (req, res) => {
  const books = await Books.find().select("-__v");

  res.send(books);
});

router.post("/", async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description)
    return res.status(400).send({
      error: {
        code: 400,
        message: "title or author or description is missing",
      },
    });

  let book = new Books(req.body);

  book = await book.save();

  res.send({
    title,
    author,
  });
});

module.exports = router;
