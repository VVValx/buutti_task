import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Icon from "../../components/icon/Icon";
import range from "../../utils/range";
import useFetchData from "../../customHooks/useFetchData";
import urls from "../../config/urls.json";

function Books() {
  const [search, setSearch] = useState("");
  const [pageSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const { getBooks } = urls.books;
  const { data, loading } = useFetchData(getBooks);
  const navigate = useNavigate();

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
  const max = Math.ceil(data.length / pageSize);
  const rangeArr = range(max);

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
        {filteredBooks.map(({ _id, title, author }) => (
          <div
            className="item"
            key={_id}
            onClick={() => navigate(`book/${_id}`)}
          >
            <div className="title">{title}</div>
            <div className="author">{author}</div>
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
  );
}

export default Books;
