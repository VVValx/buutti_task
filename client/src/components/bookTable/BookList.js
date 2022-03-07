import React from "react";

function BookList({ books, bookSelected, handleBookSelect }) {
  return books.map((book) => (
    <div
      className={`item ${bookSelected === book._id ? "bookSelected" : ""}`}
      key={book._id}
      onClick={() => handleBookSelect(book)}
    >
      <div className="title">{book.title}</div>
      <div className="author">{book.author}</div>
    </div>
  ));
}

export default BookList;
