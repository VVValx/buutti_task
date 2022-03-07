import React from "react";

function PageList({ range, currentPage, setCurrentPage }) {
  return range.map((c, index) => (
    <div
      className={`page ${currentPage === c ? "active-page" : ""}`}
      onClick={() => setCurrentPage(index + 1)}
      key={index}
    >
      {c}
    </div>
  ));
}

export default PageList;
