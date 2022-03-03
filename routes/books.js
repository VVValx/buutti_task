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

router.put("/:id", async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description)
    return res.status(400).send({
      error: {
        code: 400,
        message: "title or author or description is missing",
      },
    });

  const book = await Books.findOne({ _id: req.params.id });
  if (!book)
    return res.status(404).send({
      error: {
        code: 404,
        message: "Book not found",
      },
    });

  const bookAfterUpdate = await Books.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );

  const {
    title: newTitle,
    author: newAuthor,
    description: newDescription,
  } = bookAfterUpdate;

  res.send({ newTitle, newAuthor, newDescription });
});

module.exports = router;
