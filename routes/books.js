const express = require("express");
const router = express.Router();
const logger = require("../logger");
const Books = require("../models/books");

router.get("/", async (req, res) => {
  const books = await Books.find().select("-__v");

  logger.info("Books from database", books);
  res.send(books);
});

router.post("/", async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    res.status(400).send({
      error: {
        code: 400,
        message: "title or author or description is missing",
      },
    });

    logger.info("title or author or description is missing");
    return;
  }

  let book = new Books(req.body);

  book = await book.save();

  logger.info("New book created", book);

  res.send({
    title,
    author,
  });
});

router.put("/:id", async (req, res) => {
  const { title, author, description } = req.body;

  if (!title || !author || !description) {
    res.status(400).send({
      error: {
        code: 400,
        message: "title or author or description is missing",
      },
    });

    logger.error("title or author or description is missing");

    return;
  }

  const book = await Books.findOne({ _id: req.params.id });
  if (!book) {
    res.status(404).send({
      error: {
        code: 404,
        message: "Book not found",
      },
    });

    logger.error("Book to be updated not found");

    return;
  }

  const bookAfterUpdate = await Books.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  const {
    title: newTitle,
    author: newAuthor,
    description: newDescription,
  } = bookAfterUpdate;

  logger.info("Book updated", bookAfterUpdate);

  res.send({ newTitle, newAuthor, newDescription });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  let book = await Books.findOne({ _id: id });
  if (!book) {
    res.status(404).send({
      error: {
        code: 404,
        message: "Book not found",
      },
    });

    logger.error("Book to be deleted not found", book);
  }

  book = await Books.findByIdAndDelete(id, { new: false });

  logger.info("Book deleted successfully", book);
  res.send({
    data: { id: book.id, title: book.title },
    message: "Book deleted successfully",
  });
});

module.exports = router;
