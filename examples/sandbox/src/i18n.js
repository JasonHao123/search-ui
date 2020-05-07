import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import Fingerprint2 from 'fingerprintjs2';

if(!localStorage.getItem('clientId')) {
  Fingerprint2.get({fonts: {extendedJsFonts: true}, excludes: {userAgent: true}}, function (components) {
      var values = components.map(function (component) { return component.value })
      console.log(values);
      var clientId = Fingerprint2.x64hash128(values.join(''), 31)
      console.log(clientId);
      localStorage.setItem('clientId',clientId);
  });
}

i18n
  // load translation using xhr -> see /public/locales
  // learn more: https://github.com/i18next/i18next-xhr-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    fallbackLng: 'en',
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  });

export default i18n;
