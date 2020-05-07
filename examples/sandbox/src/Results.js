import React from "react";
import { withSearch } from "@elastic/react-search-ui";
import PropTypes from 'prop-types';
import { Link, Route,Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardActionArea from '@material-ui/core/CardActionArea';
import Button from '@material-ui/core/Button';
import CurrencyFormat from 'react-currency-format';

const currencies = {
  "USD": ['$',''],
  "EUR": ['€',''],
  "CNY": ['¥',''],
  "JPY": ['¥',''],
  "SEK": ['','kr']
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: 10,
  },
  title: {
    padding: '0.4em',
  },
  media: {
    paddingTop: '1em',
    height: '13em!important',
    objectFit: 'scale-down',
  },
  avatar: {
    position: 'absolute',
    left: '0.1em',
    backgroundColor: red[500],
    underline: 'none',
  },
}));

function Results({ results }) {
  const classes = useStyles();
  const currency = currencies[localStorage.getItem('currency')];
  return (
    <div className={classes.root}>
         <Grid container spacing={1}>
  {results.map((result) => {
    return (
  <Grid item xs={6} sm={4} md={3} lg={3} key={result.id.raw}>
  <Card className={classes.root}>
       <CardActionArea >
       <Avatar aria-label="recipe" className={classes.avatar}>
         {result.rate.raw}
       </Avatar>
       <Link to={"/product/"+result.id.raw}>
               <CardMedia
                 className={classes.media}
                 image={result.image.raw}
                 component="img"
                 title="Contemplative Reptile"
               />
               </Link>

             </CardActionArea>
             <CardContent>
               <Link to={"/product/"+result.id.raw}>
                <Typography >
                       {result.title.snippet}
                     </Typography>
                     </Link>
             </CardContent>
             <CardActions>
               <a size="small" color="primary" href={result.platform_link.raw}>
                 {result.platform.snippet}
               </a>
               <CurrencyFormat value={result.price.raw[0]} displayType={'text'} thousandSeparator={true} prefix={currency[0]} suffix={currency[1]} />
             </CardActions>
       </Card>
  </Grid>
  );
  })}
    </Grid>
    </div>
    )
}


Results.propTypes = {
  // Props
  results: PropTypes.array
};


export default withSearch(({ results}) => ({
  results
}))(Results);
