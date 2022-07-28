import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

const Paginate = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  // fill pageNumbers with # of pages needed, starting from 1
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const setActive = (number) => (currentPage === number ? true : false);

  return (
    <Pagination size="lg">
      {pageNumbers.map((number) => {
        return (
          <PaginationItem
            key={number}
            className="page-item"
            active={setActive(number)}
          >
            <PaginationLink
              onClick={() => paginate(number)}
              href="#form"
              className="page-link"
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        );
      })}
    </Pagination>
  );
};

export default Paginate;
