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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NumberFormat from 'react-number-format';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';

const currencies = {
  "USD": ['$',''],
  "EUR": ['€',''],
  "CNY": ['¥',''],
  "JPY": ['¥',''],
  "SEK": ['','kr']
};

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  range: {
    width: '40%',
  },
}));


  function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;
  const currency = currencies[localStorage.getItem('currency')];
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        console.log(values);
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix={currency[0]}
      suffix={currency[1]}
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

function PriceFacet({ filters, clearFilters,addFilter,setFilter,removeFilter,facets }) {
  const classes = useStyles();
  const [from, setFrom] = React.useState('0');
  const [to, setTo] = React.useState('99999');
  const handleChange = event => {
    if(event.target.value != '') {
      setFrom( event.target.value);
      const filter = filters.find(f => f.field === "price_c" && f.type === "all");
      if(!filter) {
        addFilter("price_c",{
          to: to,
          from: event.target.value,
          name: "price_c"
        },"all");
      }else {
        setFilter("price_c",{
          to: to,
          from: event.target.value,
          name: "price_c"
        },"all");
      }
    }
  };

  const handleChange2 = event => {
    if(event.target.value != '') {
      setTo( event.target.value);
      const filter = filters.find(f => f.field === "price_c" && f.type === "all");
      if(!filter) {
        addFilter("price_c",{
          to: event.target.value,
          from: from,
          name: "price_c"
        },"all");
      }else {
        setFilter("price_c",{
          to: event.target.value,
          from: from,
          name: "price_c"
        },"all");
      }
    }
  };

  return (
    <fieldset className="sui-facet">
      <legend className="sui-facet__title">Price</legend>
      <FormGroup row>
      <TextField
label="From" className={classes.range}
value={from}
onChange={handleChange}
name="from"
id="formatted-numberformat-input"
InputProps={{
  inputComponent: NumberFormatCustom,
}}
/>
   &nbsp;&nbsp;&nbsp;
<TextField
label="To" className={classes.range}
value={to}
onChange={handleChange2}
name="to"
id="formatted-numberformat-input2"
InputProps={{
inputComponent: NumberFormatCustom,
}}
/>
      </FormGroup>
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
