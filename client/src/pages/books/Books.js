import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Axios from "../../services/Axios";
import Icon from "../../components/icon/Icon";
import range from "../../utils/range";
import useFetchData from "../../customHooks/useFetchData";
import urls from "../../config/urls.json";

function Books() {
  const [search, setSearch] = useState("");
  const [pageSize] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [book, setBook] = useState({ title: "", author: "", description: "" });
  const [bookSelected, setBookSelected] = useState(null);
  const [apiCallSuccess, setApiCallCountSuccess] = useState(0);
  const { getBooks } = urls.books;
  const { data, loading } = useFetchData(getBooks, apiCallSuccess);

  if (loading) return <div>Loading...</div>;

  const handleSearch = () => {
    const s = search.toLocaleLowerCase();
    return data.filter(
      ({ title, author }) =>
        title.toLocaleLowerCase().includes(s) ||
        author.toLocaleLowerCase().includes(s)
    );
  };

  const handleChange = ({ target: input }) => {
    const newBook = { ...book };
    newBook[input.name] = input.value;

    setBook(newBook);
  };

  const handleBookSelect = (book) => {
    const { _id, title, author, description } = book;
    setBook({ title, author, description });
    setBookSelected(_id);
  };

  const apiCall = async (method, url, data = null) => {
    try {
      const { data: res } =
        method === "post"
          ? await Axios.post(url, data)
          : await Axios[method](url);
      console.log(res);
      setApiCallCountSuccess((value) => (value += 1));
      setBook({ title: "", author: "", description: "" });
      setBookSelected(null);
    } catch (error) {
      console.log(error);
    }
  };

  const { title, author, description } = book;
  const filteredBooks = search.length ? handleSearch() : data;
  const max = Math.ceil(data.length / pageSize);
  const rangeArr = range(max);

  return (
    <div className="main-container">
      <div className="left">
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
            <div
              className={`item ${
                bookSelected === book._id ? "bookSelected" : ""
              }`}
              key={book._id}
              onClick={() => handleBookSelect(book)}
            >
              <div className="title">{book.title}</div>
              <div className="author">{book.author}</div>
            </div>
          ))}

          <div className="pagination">
            <div className="arrow arrow-left">
              <Icon icon={<MdKeyboardArrowLeft />} />
            </div>
            {rangeArr.map((c, index) => (
              <div
                className={`page ${currentPage === c ? "active-page" : ""}`}
                key={index}
              >
                {c}
              </div>
            ))}
            <div className="arrow arrow-right">
              <Icon icon={<MdKeyboardArrowRight />} />
            </div>
          </div>

          <div className="currentPage">
            Showing {currentPage} of {max}
          </div>
        </div>
      </div>

      <div className="right">
        <div className="book-container">
          <div className="form-input">
            <div className="form-label">Title</div>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </div>

          <div className="form-input">
            <div className="form-label">Author</div>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />
          </div>

          <div className="form-input">
            <div className="form-label">Description</div>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
            />
          </div>

          <div className="form-input">
            <button onClick={() => apiCall("post", getBooks, book)}>
              Save New
            </button>
            <button
              onClick={() => apiCall("put", `${getBooks}/${bookSelected}`)}
              disabled={bookSelected ? false : true}
            >
              Save
            </button>
            <button
              onClick={() => apiCall("delete", `${getBooks}/${bookSelected}`)}
              disabled={bookSelected ? false : true}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Books;
