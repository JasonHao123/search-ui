import PropTypes from "prop-types";
import React from "react";

import { appendClassName } from "./view-helpers";

function Results({ children, className, ...rest }) {
  return (
    <section
      className={appendClassName("sui-results-container", className)}
      {...rest}
    >
      {children}
    </section>
  );
}

Results.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Results;
