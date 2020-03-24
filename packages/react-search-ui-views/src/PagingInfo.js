import PropTypes from "prop-types";
import React from "react";

import { appendClassName } from "./view-helpers";

function PagingInfo({
  showingFirst,
  showingMiddle,
  showingLast,
  className,
  end,
  searchTerm,
  start,
  totalResults,
  ...rest
}) {
  return (
    <div className={appendClassName("sui-paging-info", className)} {...rest}>
      {showingFirst}{" "}
      <strong>
        {start} - {end}
      </strong>{" "}
      {showingMiddle} <strong>{totalResults}</strong>
      {searchTerm && (
        <>
          {" "}
          {showingLast}: <em>{searchTerm}</em>
        </>
      )}
    </div>
  );
}

PagingInfo.propTypes = {
  end: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  start: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  className: PropTypes.string,
  showingFirst: PropTypes.string,
  showingMiddle: PropTypes.string,
  showingLast: PropTypes.string
};

export default PagingInfo;
