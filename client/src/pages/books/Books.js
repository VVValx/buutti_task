import React, { useState } from "react";
import { toast } from "react-toastify";
import Axios from "../../services/Axios";
import BookTable from "../../components/bookTable/BookTable";
import Form from "../../components/form/Form";
import paginate from "../../utils/paginate";
import Input from "../../components/input/Input";
import range from "../../utils/range";
import useFetchData from "../../customHooks/useFetchData";
import sortItems from "../../utils/sortItems";
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

  const handleSearch = (data) => {
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

  const handleSearchInput = ({ target }) => {
    setSearch(target.value);
    setCurrentPage(1);
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
  };

  const handleBookSelect = (book) => {
    const { _id, title, author, description } = book;
    setBook({ title, author, description });
    setBookSelected(_id);
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
    if (author && !authorArr[1])
      errors.author = "Please enter author full name";

    //description
    if (!description) errors.description = "Please enter description";

    if (Object.keys(errors).length < 1) return null;

    return errors;
  };

  const handlePost = async (url) => {
    const error = handleFormError();

    if (error) return setInputError(error);

    try {
      await Axios.post(url, book);
      setApiCallCountSuccess((value) => (value += 1));
      setBook({ title: "", author: "", description: "" });
      setBookSelected(null);
      toast.success("New book created successfully!");
    } catch (err) {
      err.response &&
        err.response.status === 400 &&
        toast.info("Please fill in the forms");
    }
  };

  const handleUpdate = async (url) => {
    const error = handleFormError();

    if (error) return setInputError(error);
    try {
      await Axios.put(url, book);
      setApiCallCountSuccess((value) => (value += 1));
      setBook({ title: "", author: "", description: "" });
      setBookSelected(null);
      toast.success("Book updated successfully!");
    } catch (err) {
      err.response &&
        err.response.status === 400 &&
        toast.info("Please fill in the forms");
    }
  };

  const handleDelete = async (url) => {
    try {
      if (!bookSelected) return toast.info("Please select book to be deleted");
      await Axios.delete(url);
      setApiCallCountSuccess((value) => (value += 1));
      setBook({ title: "", author: "", description: "" });
      setBookSelected(null);
      toast.success("Book deleted successfully!");
    } catch (err) {
      err.response &&
        err.response.status === 404 &&
        toast.info("Book already deleted");
    }
  };

  const sortedBooks = sortItems(data);
  const filteredBooks = search.length ? handleSearch(sortedBooks) : sortedBooks;
  const max = Math.ceil(filteredBooks.length / pageSize);
  const rangeArr = range(max);
  const paginatedBooks = paginate(filteredBooks, currentPage, pageSize);

  const changeCurrentPage = (n) => {
    if (n === 1 && currentPage === rangeArr[rangeArr.length - 1]) return;
    if (n === -1 && currentPage === 1) return;
    setCurrentPage((page) => (page += n));
  };

  return (
    <div className="main-container">
      <div className="left">
        <Input
          className="search"
          value={search}
          onChange={handleSearchInput}
          placeholder="Search book by title or author"
        />

        <BookTable
          books={paginatedBooks}
          bookSelected={bookSelected}
          handleBookSelect={handleBookSelect}
          changeCurrentPage={changeCurrentPage}
          range={rangeArr}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          max={max}
        />
      </div>

      <div className="right">
        <Form
          inputError={inputError}
          book={book}
          bookSelected={bookSelected}
          handleChange={handleChange}
          handlePost={handlePost}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default Books;
