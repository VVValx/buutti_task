import React, { useState } from "react";
import useFetchData from "../../customHooks/useFetchData";
import urls from "../../config/urls.json";

function Books() {
  const [search, setSearch] = useState("");
  const { getBooks } = urls.books;
  const { data, loading } = useFetchData(getBooks);

  if (loading) return <div>Loading...</div>;

  const handleSearch = () => {
    const s = search.toLocaleLowerCase();
    return data.filter(
      ({ title, author }) =>
        title.toLocaleLowerCase().includes(s) ||
        author.toLocaleLowerCase().includes(s)
    );
  };

  const filteredBooks = search.length ? handleSearch() : data;

  return (
    <div className="main-container">
      <div className="search">
        <input
          type="text"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Search Book"
        />
      </div>
      <div className="list-container">
        <div className="list-header">
          <div className="list-title">Title</div>
          <div className="list-author">Author</div>
        </div>
        {filteredBooks.map((book) => (
          <div className="item" key={book._id}>
            <div className="title">{book.title}</div>
            <div className="author">{book.author}</div>
          </div>
        ))}

        <div className="pagination"></div>
      </div>
    </div>
  );
}

export default Books;
