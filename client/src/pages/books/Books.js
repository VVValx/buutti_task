import React, { useState } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Axios from "../../services/Axios";
import paginate from "../../utils/paginate";
import Icon from "../../components/icon/Icon";
import range from "../../utils/range";
import useFetchData from "../../customHooks/useFetchData";
import urls from "../../config/urls.json";

function Books() {
  const [search, setSearch] = useState("");
  const [inputError, setInputError] = useState({
    title: "",
    author: "",
    description: "",
  });
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

  const handleInputError = ({ name, value }) => {
    let message = "";
    if (name === "title" || name === "author") {
      if (!value) message = `Please enter ${name}`;
      if (value && value.length < 3)
        message = `${name} should not be less than 3 characters`;
      if (value.length > 50)
        message = `${name} should not be more than 50 characters`;
    }

    if (name === "description")
      if (!value) message = "Please enter description";

    if (!message) return null;

    return message;
  };

  const handleChange = ({ target: input }) => {
    const newBook = { ...book };
    const errors = { ...inputError };

    const errorMessage = handleInputError(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    newBook[input.name] = input.value;

    setBook(newBook);
    setInputError(errors);
    setCurrentPage(1);
  };

  const handleBookSelect = (book) => {
    const { _id, title, author, description } = book;
    setBook({ title, author, description });
    setBookSelected(_id);
  };

  const changeCurrentPage = (n) => {
    if (n === -1 && currentPage === 1) return;
    setCurrentPage((page) => (page += n));
  };

  const handleFormError = () => {
    const { title, author, description } = book;
    const authorArr = author.split(" ");
    const errors = {};

    //name validation
    if (!title) errors.title = "Please enter title";
    if (title && title.length < 3)
      errors.title = "Title cannot be less than 3 characters";
    if (title.length > 50)
      errors.title = "Title cannot be more than 50 characters";

    //author
    if (!author) errors.author = "Please enter author";
    if (author && author.length < 3)
      errors.title = "author cannot be less than 3 characters";
    if (author.length > 50)
      errors.author = "author cannot be more than 50 characters";
    if (!authorArr[1]) errors.author = "Please enter author full name";

    //description
    if (!description) errors.description = "Please enter description";

    if (Object.keys(errors).length < 1) return null;

    return errors;
  };

  const apiCall = async (method, url, data = null) => {
    const error = handleFormError();

    if (error) return setInputError(error);

    try {
      const { data: res } =
        method === "delete"
          ? await Axios.delete(url)
          : await Axios[method](url, data);
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
  const max = Math.ceil(filteredBooks.length / pageSize);
  const rangeArr = range(max);
  const paginatedBooks = paginate(filteredBooks, currentPage, pageSize);

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
          {paginatedBooks.map((book) => (
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
            <div
              className="arrow arrow-left"
              onClick={() => changeCurrentPage(-1)}
            >
              <Icon icon={<MdKeyboardArrowLeft />} />
            </div>
            {rangeArr.map((c, index) => (
              <div
                className={`page ${currentPage === c ? "active-page" : ""}`}
                onClick={() => setCurrentPage(index + 1)}
                key={index}
              >
                {c}
              </div>
            ))}
            <div
              className="arrow arrow-right"
              onClick={() => changeCurrentPage(1)}
            >
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

            {inputError.title && <p className="error">{inputError.title}</p>}
          </div>

          <div className="form-input">
            <div className="form-label">Author</div>
            <input
              type="text"
              name="author"
              value={author}
              onChange={handleChange}
            />

            {inputError.author && <p className="error">{inputError.author}</p>}
          </div>

          <div className="form-input">
            <div className="form-label">Description</div>
            <textarea
              name="description"
              value={description}
              onChange={handleChange}
            />

            {inputError.description && (
              <p className="error">{inputError.description}</p>
            )}
          </div>

          <div className="form-input">
            <button onClick={() => apiCall("post", getBooks, book)}>
              Save New
            </button>
            <button
              onClick={() =>
                apiCall("put", `${getBooks}/${bookSelected}`, book)
              }
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
