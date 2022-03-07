import React from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import PageList from "./PageList";
import Icon from "../icon/Icon";

function Pagination({
  changeCurrentPage,
  range,
  currentPage,
  setCurrentPage,
  max,
}) {
  return (
    <>
      <div className="pagination">
        <div className="arrow arrow-left" onClick={() => changeCurrentPage(-1)}>
          <Icon icon={<MdKeyboardArrowLeft />} />
        </div>

        <PageList
          range={range}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />

        <div className="arrow arrow-right" onClick={() => changeCurrentPage(1)}>
          <Icon icon={<MdKeyboardArrowRight />} />
        </div>
      </div>

      <div className="currentPage">
        Showing {currentPage} of {max}
      </div>
    </>
  );
}

export default Pagination;
