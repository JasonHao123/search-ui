import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { Link, Route,Switch } from 'react-router-dom';




const Results = ({ results }) => (
<section className="sui-results-container">
  {results.map((result) => {
    return (
  <article className="sui-result" key={result.id.raw}>
  <Link to={"/product/"+result.id.raw}>
  <img className="sui-result__img" src={result.image.raw} alt=" " />
  </Link>
  <p><a href="http://apotea.huixin.io">apotea</a> 62.48</p>
  <Link to={"/product/"+result.id.raw} className="sui-result__title">{result.title.snippet}</Link>
  </article>
  );
  })}
    </section>
);


Results.propTypes = {
  // Props
  results: PropTypes.array
};


export default withSearch(({ results}) => ({
  results
}))(Results);
