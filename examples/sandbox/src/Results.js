import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { Link, Route,Switch } from 'react-router-dom';




const Results = ({ results }) => (
<section class="sui-results-container">
  {results.map((sub) => {
    return (
  <article class="sui-result">
  <Link to="/product">
  <img class="sui-result__img" src="https://media.apotea.se/product-images/MS/ebastin-orifarm-filmdragerad-tablett-10-mg-30-st-0.jpg" alt=" " />
  </Link>
  <p><a href="http://apotea.huixin.io">apotea</a> 62.48</p>
  <a class="sui-result__title" href="https://www.apotea.se/ebastin-orifarm-filmdragerad-tablett-10-mg-30-st" target="_blank" rel="noopener noreferrer">Ebastin Orifarm薄膜衣片10毫克30片</a>
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
