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

const images = [
  {
    original: 'https://picsum.photos/id/1018/1000/600/',
    thumbnail: 'https://picsum.photos/id/1018/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1015/1000/600/',
    thumbnail: 'https://picsum.photos/id/1015/250/150/',
  },
  {
    original: 'https://picsum.photos/id/1019/1000/600/',
    thumbnail: 'https://picsum.photos/id/1019/1000/600/',
  },
];

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
    posts: [],
    value: 0,
  }

  componentDidMount() {
    const { match: { params } } = this.props;
    axios.get(`/api/product/${params.id}`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
  }

  render() {
    const { classes } = this.props;

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
            <ImageGallery items={images} />
          </Grid>
          <Grid item xs={12} sm={7} style={{marginTop: '4em'}}>
          <Card >
          <CardHeader className={classes.title}
   avatar={
     <Avatar aria-label="recipe" className={classes.avatar}>
       R
     </Avatar>
   }
   title="Shrimp and Chorizo Paella"
 />
   <CardContent>
     <Typography className={classes.title} color="textSecondary" gutterBottom>
       Word of the Day
     </Typography>
     <Typography variant="h5" component="h2">
       be{bull}nev{bull}o{bull}lent
     </Typography>
     <Typography className={classes.pos} color="textSecondary">
       adjective
     </Typography>
     <Typography variant="body2" component="p">
       well meaning and kindly.
       <br />
       {'"a benevolent smile"'}
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
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
    </AppBar>
    <TabPanel value={this.state.value} index={0}>
      Item One
    </TabPanel>
    <TabPanel value={this.state.value} index={1}>
      Item Two
    </TabPanel>
    <TabPanel value={this.state.value} index={2}>
      Item Three
    </TabPanel>
    <TabPanel value={this.state.value} index={3}>
      Item Four
    </TabPanel>
    <TabPanel value={this.state.value} index={4}>
      Item Five
    </TabPanel>
    <TabPanel value={this.state.value} index={5}>
      Item Six
    </TabPanel>
    <TabPanel value={this.state.value} index={6}>
      Item Seven
    </TabPanel>
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
