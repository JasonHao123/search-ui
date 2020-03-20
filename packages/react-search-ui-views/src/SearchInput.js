import PropTypes from "prop-types";
import React from "react";

function SearchInput({ getAutocomplete, getInputProps }) {
  return (
    <>
      <div className="sui-search-box__wrapper">
        <input {...getInputProps()} />
        {getAutocomplete()}
      </div>
    </>
  );
}

SearchInput.propTypes = {
  getAutocomplete: PropTypes.func.isRequired,
  getInputProps: PropTypes.func.isRequired
};

export default SearchInput;
