import React, { Component, Suspense } from 'react';
import moment from "moment";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';

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
import { useTranslation, withTranslation, Trans } from 'react-i18next';

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
  debug: true,
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
    disjunctiveFacets: ["catalog", "category", "tenant", "price_c"],
    facets: {
      tenant: { type: "value" },
      category: { type: "value", size: 30 },
      catalog: {
        type: "value",
        size: 30
      },
      location: {
        // San Francisco. In the future, make this the user's current position
        center: "37.7749, -122.4194",
        type: "range",
        unit: "mi",
        ranges: [
          { from: 0, to: 100, name: "Nearby" },
          { from: 100, to: 500, name: "A longer drive" },
          { from: 500, name: "Perhaps fly?" }
        ]
      },
      price_c: {
        type: "range",
        ranges: [
          { from: 0, to: 10000, name: "0 - 10000" },
          { from: 10001, to: 100000, name: "10001 - 100000" },
          { from: 100001, to: 500000, name: "100001 - 500000" },
          { from: 500001, to: 1000000, name: "500001 - 1000000" },
          { from: 1000001, to: 5000000, name: "1000001 - 5000000" },
          { from: 5000001, to: 10000000, name: "5000001 - 10000000" },
          { from: 10000001, name: "10000001+" }
        ]
      }
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

const changeLanguage = lng => {
   i18next.changeLanguage(lng.currentTarget.value);
   window.location.reload(false);
};

export default function App() {



  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
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
                  }
                  sideContent={
                    <div>
                    <fieldset className="sui-facet">
                      <legend className="sui-facet__title">Language</legend>
                      <div className="sui-boolean-facet">

                        <select value={i18next.language} onChange={changeLanguage} className="lang" >
                          <option value="zh">中文</option>
                          <option value="ja">日语</option>
                          <option value="de">Deutsch</option>
                          <option value="en">English</option>
                          <option value="fr">Français</option>
                        </select>
                    </div></fieldset>
                      <Facet
                        field="catalog"
                        label="Catalog"
                        view={SingleSelectFacet}
                      />
                      <CategoryFacet />
                      <Facet
                        field="tenant"
                        label="Platform"
                        view={MultiCheckboxFacet}
                      />
                      <Facet
                        field="price_c"
                        label="Price"
                        view={SingleLinksFacet}
                      />
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField="title"
                      urlField="nps_link"
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
