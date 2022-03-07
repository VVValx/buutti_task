import React from "react";
import urls from "../../config/urls.json";

function ButtonGroup({ bookSelected, handlePost, handleUpdate, handleDelete }) {
  const { getBooks } = urls.books;

  return (
    <div className="btn-group">
      <button onClick={() => handlePost(getBooks)}>Save New</button>
      <button
        onClick={() => handleUpdate(`${getBooks}/${bookSelected}`)}
        disabled={bookSelected ? false : true}
      >
        Save
      </button>
      <button
        onClick={() => handleDelete(`${getBooks}/${bookSelected}`)}
        disabled={bookSelected ? false : true}
      >
        Delete
      </button>
    </div>
  );
}

export default ButtonGroup;
