import React from "react";
import "./Pagination.css";

export const Pagination = ({ currentPage, setCurrentPage }) => {
  let pages = [1, 2, 3];

  return (
    <div>
      <div className="pagination">
        <button
          onClick={() => setCurrentPage(pages[0])}
          className={pages[0] === currentPage ? "active" : "elipse"}
        ></button>
        <button
          onClick={() => setCurrentPage(pages[1])}
          className={pages[1] === currentPage ? "active" : "elipse"}
        ></button>
        <button
          onClick={() => setCurrentPage(pages[2])}
          className={pages[2] === currentPage ? "active" : "elipse"}
        ></button>
      </div>
    </div>
  );
};
