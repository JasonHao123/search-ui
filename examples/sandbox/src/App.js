import React, { Component, Suspense } from 'react';
import { useTranslation, withTranslation, Trans } from 'react-i18next';
import logo from './logo.svg';
import './App.css';

import moment from "moment";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import './App.css';

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import SiteSearchAPIConnector from "@elastic/search-ui-site-search-connector";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  Layout,
  SingleSelectFacet,
  MultiCheckboxFacet,
  SingleLinksFacet,
  BooleanFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import CategoryFacet from "./CategoryFacet.js";
import PriceFacet from "./PriceFacet.js";
import ProductDetail from "./ProductDetail.js";
import Results from "./Results.js";
import { Link, Route,Switch } from 'react-router-dom';
import {Helmet} from "react-helmet";

let connector = new AppSearchAPIConnector({
 searchKey: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF1dGhvcml0aWVzIjpbIlBFUk1JU1NJT05fUkVBRCIsIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiOGNhMmI2NTQtZTNkNS00Yzk3LThhODctNjgyODQ4ZmE3Zjc4IiwidGVuYW50IjoiamFzb24iLCJjbGllbnRfaWQiOiJkZWZhdWx0In0.LGqO8fNovd8tLXTEkYFr4oFxfg2OvAvcfffgF_s9k2sAuIYuIt8ofRLs5np_N5v4OfjCi1WbDuocS8F_7jV3UoAXnBelScQO3iOrmYDgYcaUgHjHw3FTBBCYShsolRAheCIxfgMKq0o04ZLEFkp6osgF7igPeyU0DhNoJrcxcYsR6zSNU5rKBxbBU_sgVQGIYmV30B5EqQP9q2Q_LZCP6fTCZoCW5Ln-ntP3GmRTm4YJHVGuwy_LsTJ5NWMXUFXlMnDFpzEQKW62n2px1t9eze5b2WoCSS-e6LjBlm5235P9tXd9OYF_TgLroI2B9G5QWjcxsLenM3nOfwx3RMA9Ig",
 engineName:  "search-ui-examples",
 hostIdentifier:  "host-2376rb",
 endpointBase: "/api"
});

const config = {
  debug: false,
  alwaysSearchOnInitialLoad: true,
  searchQuery: {
    result_fields: {
      visitors: { raw: {} },
      world_heritage_site: { raw: {} },
      location: { raw: {} },
      catalog: { raw: {} },
      square_km: { raw: {} },
      title: {
        snippet: {
          size: 100,
          fallback: true
        }
      },
      nps_link: { raw: {} },
      cat: { raw: {} },
      date_established: { raw: {} },
      description: {
        snippet: {
          size: 100,
          fallback: true
        }
      }
    },
    disjunctiveFacets: ["catalog", "category", "tenant","country","region","brand"],
    facets: {
      tenant: { type: "value" },
      region: { type: "value" },
      country: { type: "value" },
      category: { type: "value", size: 30 },
      brand: { type: "value", size: 30 },
      catalog: {  type: "value", size: 30}
    }
  },
  autocompleteQuery: {
    results: {
      resultsPerPage: 5,
      result_fields: {
        title: {
          snippet: {
            size: 100,
            fallback: true
          }
        },
        nps_link: {
          raw: {}
        }
      }
    },
    suggestions: {
      types: {
        documents: {
          fields: ["title"]
        }
      },
      size: 4
    }
  },
  apiConnector: connector,
  hasA11yNotifications: true
};

const changeCurrency = event => {
  localStorage.setItem('currency',event.target.value);
  window.location.reload(false);
};

const changeCurrencyNoRefresh = event => {
  localStorage.setItem('currency',event.target.value);
};

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logo: {
    height: '10vmin',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: '60vw',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function getMeta(metaName) {
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === metaName) {
      return metas[i].getAttribute('content');
    }
  }

  return '';
}

// use hoc for class based components
class LegacyWelcomeClass extends Component {
  render() {
    const { t, i18n } = this.props;
    return <h2>{t('title')}</h2>;
  }
}
const Welcome = withTranslation()(LegacyWelcomeClass);

// Component using the Trans component
function MyComponent() {
  return (
    <Trans i18nKey="description.part1">
      To get started, edit <code>src/App.js</code> and save to reload.
    </Trans>
  );
}

// page uses the hook
function Page() {

  const { t, i18n } = useTranslation();

  const SORT_OPTIONS = [
    {
      name: t("label.relevance"),
      value: "",
      direction: ""
    },
    {
      name: t("label.newest"),
      value: "create_date",
      direction: "desc"
    },
    {
      name: t("label.promotion"),
      value: "rate",
      direction: "asc"
    },
    {
      name: t("label.priceAsc"),
      value: "price_c",
      direction: "asc"
    },
    {
      name: t("label.priceDesc"),
      value: "price_c",
      direction: "desc"
    }
  ];


  const changeLanguage = event => {
     i18n.changeLanguage(event.target.value);
     window.location.reload(false);
  };

  const changeLanguageNoRefresh = event => {
     i18n.changeLanguage(event.target.value);
  };

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [lang, setLang] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const getLang = String(lang);

  const [open, setOpen] = React.useState(false);

  const handleProfileMenuOpen = event => {
    setAnchorEl(!isMenuOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    window.location.reload(false);
  };

  const handleClose2 = () => {
    setOpen(false);
  };

  const tracking = (a,b) => {
    console.log(a);
    this.props.history.push("/category");
    window.location.href = "/category";
  }

  return (
    <SearchProvider config={config}>
    <WithSearch
      mapContextToProps={({ searchTerm ,wasSearched }) => ({
        searchTerm,
        wasSearched
      })}
    >
        {({ wasSearched,searchTerm }) => {
          return (
            <div className={classes.root}>
            <Helmet>
     <meta charSet="utf-8" />
     <title>{`findi.io | `+searchTerm}</title>
     <meta property="og:type" content="website" />
     <meta property="og:title" content={`findi.io | `+searchTerm} />
     <meta property="og:description" content="findi.io is a website for online shop translation and product search." />
     <meta property="og:image" content="findi.png" />
     <meta property="og:share" content="https://www.findi.io" />
 </Helmet>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
       <DialogContent>
         <form className={classes.container}>
         <FormControl className={classes.formControl}>
         <Select value={`${i18n.language}`}
             onChange={changeLanguageNoRefresh}
           >
             <MenuItem value="zh">中文</MenuItem>
             <MenuItem value="ja">日语</MenuItem>
             <MenuItem value="en">English</MenuItem>
             <MenuItem value="fr">Français</MenuItem>
             <MenuItem value="de">Deutsch</MenuItem>
             <MenuItem value="es">Espanol</MenuItem>
             <MenuItem value="pt">Português</MenuItem>
           </Select>
           </FormControl>
           <FormControl className={classes.formControl}>
           <Select value={`${localStorage.getItem('currency')}`}
               onChange={changeCurrencyNoRefresh}
             >
               <MenuItem value="USD">USD</MenuItem>
               <MenuItem value="JPY">JPY</MenuItem>
               <MenuItem value="CNY">CNY</MenuItem>
               <MenuItem value="EUR">EUR</MenuItem>
               <MenuItem value="SEK">SEK</MenuItem>
             </Select>
             </FormControl>
         </form>
       </DialogContent>
       <DialogActions>
         <Button onClick={handleClose2} color="primary">
           {t('label.cancel')}
         </Button>
         <Button onClick={handleClose} color="primary">
           {t('label.ok')}
         </Button>
       </DialogActions>
     </Dialog>
              <ErrorBoundary>
                <Layout
                  open={isMenuOpen}
                  toggle={handleProfileMenuOpen}
                  header={
                    <AppBar position="static">
                      <Toolbar>
                      <IconButton onClick={handleProfileMenuOpen}
                        edge="start"
                        className={classes.sectionMobile}
                        color="inherit"
                        aria-label="open drawer"
                      >
                        <MenuIcon />
                      </IconButton>
                      <a href="https://www.findi.io">
                      <img src={getMeta('logo')} className={classes.logo} alt="logo" className={classes.sectionDesktop} />
                      </a>
                        <SearchBox className={classes.search}
                          autocompleteMinimumCharacters={3}
                          autocompleteResults={false}
                          autocompleteSuggestions={false}
                          debounceLength={0}
                        />
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                          <FormControl className={classes.formControl}>
                          <Select value={`${i18n.language}`}
                              onChange={changeLanguage}
                            >
                              <MenuItem value="zh">中文</MenuItem>
                              <MenuItem value="ja">日语</MenuItem>
                              <MenuItem value="en">English</MenuItem>
                              <MenuItem value="fr">Français</MenuItem>
                              <MenuItem value="de">Deutsch</MenuItem>
                              <MenuItem value="es">Espanol</MenuItem>
                              <MenuItem value="pt">Português</MenuItem>
                            </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                            <Select value={`${localStorage.getItem('currency')}`}
                                onChange={changeCurrency}
                              >
                                <MenuItem value="USD">USD</MenuItem>
                                <MenuItem value="JPY">JPY</MenuItem>
                                <MenuItem value="EUR">EUR</MenuItem>
                                <MenuItem value="CNY">CNY</MenuItem>
                                <MenuItem value="SEK">SEK</MenuItem>
                              </Select>
                              </FormControl>
                        </div>
                        <div className={classes.sectionMobile}>
                          <IconButton
                            onClick={handleClickOpen}
                            aria-label="show more"
                            aria-haspopup="true"
                            color="inherit"
                          >
                            <MoreIcon />
                          </IconButton>
                        </div>
                      </Toolbar>
                    </AppBar>

                  }
                  toggleButton={t('label.toggle')}
                  sideContent={
                    <div>
                    {wasSearched && (
                       <Sorting label={t('label.sortBy')} sortOptions={SORT_OPTIONS} />
                     )}
                      <Facet
                        field="catalog"
                        label={t('label.catalog')}
                        view={SingleSelectFacet}
                      />
                      <CategoryFacet label={t('label.category')} />
                      <Facet
                        field="region"
                        filterType="any"
                        label={t('label.region')}
                        view={MultiCheckboxFacet}
                      />
                      <Facet
                        field="country"
                        filterType="any"
                        label={t('label.country')}
                        view={MultiCheckboxFacet}
                      />
                      <Facet
                        field="tenant"
                        filterType="any"
                        label={t('label.platform')}
                        view={MultiCheckboxFacet}
                      />
                      <Facet
                        field="brand"
                        filterType="any"
                        label={t('label.brand')}
                        view={MultiCheckboxFacet}
                      />
                      <PriceFacet label={t('label.price')} />
                    </div>
                  }
                  bodyContent={
                    <Results
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo showingFirst={t('label.showing.first')} showingMiddle={t('label.showing.middle')} showingLast={t('label.showing.last')} />}
                      {wasSearched && <ResultsPerPage show={t('label.show')} />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

// loading component for suspense fallback
const Loader = () => (
  <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <div>loading...</div>
  </div>
);

// here app catches the suspense from page in case translations are not yet loaded

class App extends Component {

  render() {

    return (
      <Suspense fallback={<Loader />}>

    <Switch>
      <Route exact path="/" component={Page}/>
      <Route path="/product/:id" component={ProductDetail}/>
    </Switch>
     </Suspense>
    );
  }
}

export default App;
