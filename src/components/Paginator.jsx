import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

class Paginator extends React.Component {
  render() {
    const { currentPage, totalPages } = this.props;

    const pageLinks = [];
    for (let i = 1; i <= totalPages; ++i) {
      pageLinks.push(
        <PaginationItem active={i === currentPage} key={i}>
          <PaginationLink onClick={() => this.props.selectPage(i)}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return (
      <div className="Paginator">
        <div className="Paginator__current">
          Page {currentPage} of {totalPages}.
        </div>
        {totalPages > 1 && (
          <div className="Paginator__links">
            <Pagination aria-label="Gallery pagination">{pageLinks}</Pagination>
          </div>
        )}
      </div>
    );
  }
}

export default Paginator;
