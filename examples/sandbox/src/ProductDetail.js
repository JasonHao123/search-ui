import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

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

import "react-image-gallery/styles/css/image-gallery.css";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import ImageGallery from 'react-image-gallery';

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import CurrencyFormat from 'react-currency-format';

const currencies = {
  "USD": ['$',''],
  "EUR": ['€',''],
  "CNY": ['¥',''],
  "JPY": ['¥',''],
  "SEK": ['','kr']
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  media: {
    height: '13em',
    objectFit: 'scale-down',
  },
  avatar: {
    backgroundColor: red[500],
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  card: {
    minWidth: 275,
    marginTop: '3em!important',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

class ProductDetail extends React.Component {
  state = {
    data: {
      images:[],
      tabs:[],
      price:  ['0.0'],
    },
    value: 0,
  }

  componentDidMount() {
    var lang = localStorage.getItem("i18nextLng");
    if (!lang) {
      lang = "en";
      localStorage.setItem("i18nextLng", lang);
    }
    var currency = localStorage.getItem("currency");
    if (!currency) {
      currency = "USD";
      localStorage.setItem("currency", currency);
    }
    const { match: { params } } = this.props;
    axios.get(`/api/product/${params.id}`,{ headers: { language: lang, currency: currency } })
      .then(res => {
        this.setState({data:res.data});
      });
  }

  render() {
    const { classes } = this.props;
    const currency = currencies[localStorage.getItem('currency')];
    const bull = <span className={classes.bullet}>•</span>;

    return (
      <React.Fragment>
      <AppBar>
      <a color="primary"
        type="link"
        onClick={() => this.props.history.goBack()}
      >
                  <Fab color="primary" className={classes.fab} aria-label={'back'}>

                  <ArrowBackIosOutlinedIcon />

                  </Fab>
                        </a>
  </AppBar>
      <div className={classes.root}>

        <Grid container spacing={3}
        >
          <Grid item xs={12} sm={5} style={{marginTop: '4em'}}>
            <ImageGallery items={this.state.data.images} showThumbnails={false} />
          </Grid>
          <Grid item xs={12} sm={7} style={{marginTop: '4em'}}>
          <Card >
          <CardHeader className={classes.title}
   avatar={
     <Avatar aria-label="recipe" className={classes.avatar}>
       {this.state.data.rate}
     </Avatar>
   }
   title={     <Typography variant="h5" component="h2">
          {this.state.data.title}
        </Typography>}
 />
   <CardContent>
    <a href={this.state.data.link} target="_blank">
     <Typography className={classes.pos} color="textSecondary">
       {this.state.data.platform}
     </Typography>
     </a>
     <Typography variant="body2" component="p">
       <CurrencyFormat value={this.state.data.price[0]} displayType={'text'} thousandSeparator={true} prefix={currency[0]} suffix={currency[1]} />
     </Typography>
   </CardContent>
   <CardActions disableSpacing>
     <IconButton aria-label="add to favorites">
       <FavoriteIcon />
     </IconButton>
     <IconButton aria-label="share">
       <ShareIcon />
     </IconButton>
   </CardActions>
 </Card>
          </Grid>
          <Grid item xs={12} sm={12} >
          <AppBar position="static" color="default">
      <Tabs
        value={this.state.value}
        onChange={(event,newValue) =>{this.setState({ value:newValue })}}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
      >
      {this.state.data.tabs.map((item) => {
        return (
        <Tab label={item.title}  />
      );
      })}
      </Tabs>
    </AppBar>
    {this.state.data.tabs.map((item,i) => {
      return (
        <TabPanel value={this.state.value} index={i}>
          <div
  dangerouslySetInnerHTML={{
    __html: item.content
  }}></div>
        </TabPanel>
    );
    })}

          </Grid>
        </Grid>


      </div>

  </React.Fragment>
    );
  }
}


ProductDetail.propTypes = {
  params: PropTypes.array,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

export default withStyles(useStyles)(withRouter(ProductDetail));
