const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookSchema = new Schema({
  title: { type: String, minLength: 3, maxLength: 50, required: true },
  author: { type: String, minLength: 3, maxLength: 50, required: true },
  description: { type: String },
});

const Books = mongoose.model("Books", bookSchema);

module.exports = Books;
