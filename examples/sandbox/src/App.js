import React, { Component, Suspense } from 'react';
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
  Results,
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
import { useTranslation,initReactI18next } from 'react-i18next';
import Backend from 'i18next-xhr-backend';
import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const i18nextOptions = {
  // order and from where user language should be detected
  order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // only detect languages that are in the whitelist
  checkWhitelist: true
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .init(i18nextOptions);

const SORT_OPTIONS = [
  {
    name: "Relevance",
    value: "",
    direction: ""
  },
  {
    name: "Title",
    value: "title",
    direction: "asc"
  },
  {
    name: "Price",
    value: "price_c",
    direction: "asc"
  }
];

let connector;
if (process.env.REACT_APP_SOURCE === "SITE_SEARCH") {
  connector = new SiteSearchAPIConnector({
    engineKey:
      process.env.REACT_SITE_SEARCH_ENGINE_KEY || "Z43R5U3HiDsDgpKawZkA",
    documentType: process.env.REACT_SITE_SEARCH_ENGINE_NAME || "national-parks"
  });
} else {
  connector = new AppSearchAPIConnector({
    searchKey:
      process.env.REACT_APP_SEARCH_KEY || "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50SWQiOjEsInVzZXJfbmFtZSI6ImFkbWluIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sImF1dGhvcml0aWVzIjpbIlBFUk1JU1NJT05fUkVBRCIsIlJPTEVfQURNSU4iLCJST0xFX1VTRVIiXSwianRpIjoiOGNhMmI2NTQtZTNkNS00Yzk3LThhODctNjgyODQ4ZmE3Zjc4IiwidGVuYW50IjoiamFzb24iLCJjbGllbnRfaWQiOiJkZWZhdWx0In0.LGqO8fNovd8tLXTEkYFr4oFxfg2OvAvcfffgF_s9k2sAuIYuIt8ofRLs5np_N5v4OfjCi1WbDuocS8F_7jV3UoAXnBelScQO3iOrmYDgYcaUgHjHw3FTBBCYShsolRAheCIxfgMKq0o04ZLEFkp6osgF7igPeyU0DhNoJrcxcYsR6zSNU5rKBxbBU_sgVQGIYmV30B5EqQP9q2Q_LZCP6fTCZoCW5Ln-ntP3GmRTm4YJHVGuwy_LsTJ5NWMXUFXlMnDFpzEQKW62n2px1t9eze5b2WoCSS-e6LjBlm5235P9tXd9OYF_TgLroI2B9G5QWjcxsLenM3nOfwx3RMA9Ig",
    engineName:
      process.env.REACT_APP_SEARCH_ENGINE_NAME || "search-ui-examples",
    hostIdentifier:
      process.env.REACT_APP_SEARCH_HOST_IDENTIFIER || "host-2376rb",
    endpointBase: process.env.REACT_APP_SEARCH_ENDPOINT_BASE || "/catalog"
  });
}

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
    disjunctiveFacets: ["catalog", "category", "tenant","country"],
    facets: {
      tenant: { type: "value" },
      country: { type: "value" },
      category: { type: "value", size: 30 },
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

const changeLanguage = event => {
   i18next.changeLanguage(event.target.value);
   window.location.reload(false);
};

const changeCurrency = event => {
  localStorage.setItem('currency',event.target.value);
  window.location.reload(false);
};

const changeLanguageNoRefresh = event => {
   i18next.changeLanguage(event.target.value);
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

export default function App() {
  const { t, i18n } = useTranslation();
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


  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className={classes.root}>
            <Dialog disableBackdropClick disableEscapeKeyDown open={open} onClose={handleClose}>
       <DialogContent>
         <form className={classes.container}>
         <FormControl className={classes.formControl}>
         <Select value={`${i18next.language}`}
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
                      <img src={getMeta('logo')} className={classes.logo} alt="logo" className={classes.sectionDesktop} />
                        <SearchBox className={classes.search}
                          autocompleteMinimumCharacters={3}
                          autocompleteResults={{
                            linkTarget: "_blank",
                            sectionTitle: "Results",
                            titleField: "title",
                            urlField: "nps_link",
                            shouldTrackClickThrough: true,
                            clickThroughTags: ["test"]
                          }}
                          autocompleteSuggestions={true}
                          debounceLength={0}
                        />
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                          <FormControl className={classes.formControl}>
                          <Select value={`${i18next.language}`}
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
                        field="country"
                        label={t('label.country')}
                        view={MultiCheckboxFacet}
                      />
                      <Facet
                        field="tenant"
                        label={t('label.platform')}
                        view={MultiCheckboxFacet}
                      />
                      <PriceFacet label={t('label.price')} />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="nps_link"
                      imageField="image"
                      platformField="platform"
                      platformLinkField="platform_link"
                      priceField="price"
                      shouldTrackClickThrough={true}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
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
