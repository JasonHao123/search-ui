import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import CheckIcon from '@material-ui/icons/Check';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from '@material-ui/icons/Label';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import InfoIcon from '@material-ui/icons/Info';
import ForumIcon from '@material-ui/icons/Forum';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import Slider from '@material-ui/core/Slider';

  const value = [0, 1000];
  const range = {
    "USD": [0,5000],
    "EUR": [0,5000],
    "SEK": [0,20000]
  };
  function valuetext(value) {
    return `${value}°C`;
  }


function PriceFacet({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) {


  const handleChange = (event, newValue) => {
  //  setValue(newValue);
  // console.log(newValue);
    value[0] = newValue[0];
    value[1] = newValue[1];
    const filter = filters.find(f => f.field === "price_c" && f.type === "all");
    if(!filter) {
      addFilter("price_c",{
        to: value[1],
        from: value[0],
        name: "price_c"
      },"all");
    }else {
      setFilter("price_c",{
        to: value[1],
        from: value[0],
        name: "price_c"
      },"all");
    }
  };
  return (
    <fieldset className="sui-facet">
    <legend className="sui-facet__title">Price</legend>
    <div className="price">
    <Slider
      min={range[localStorage.getItem('currency')?localStorage.getItem('currency'):"USD"][0]}
      max={range[localStorage.getItem('currency')?localStorage.getItem('currency'):"USD"][1]}
      value={value}
      onChange={handleChange}
      getAriaValueText={valuetext}
      aria-labelledby="range-slider"
      valueLabelDisplay="on"
    />
    </div>
    </fieldset>
  );
}

export default withSearch(({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) => ({
  filters,
  clearFilters,
  addFilter,
  setFilter,
  removeFilter,
  facets
}))(PriceFacet);
