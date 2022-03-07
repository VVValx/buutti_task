import React from "react";
import BookList from "./BookList";
import Pagination from "../pagination/Pagination";

function BookTable({
  books,
  bookSelected,
  handleBookSelect,
  changeCurrentPage,
  range,
  currentPage,
  setCurrentPage,
  max,
}) {
  return (
    <div className="list-container">
      <div className="list-header">
        <div className="list-title">Title</div>
        <div className="list-author">Author</div>
      </div>

      <BookList
        books={books}
        bookSelected={bookSelected}
        handleBookSelect={handleBookSelect}
      />

      <Pagination
        changeCurrentPage={changeCurrentPage}
        range={range}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        max={max}
      />
    </div>
  );
}

export default BookTable;
