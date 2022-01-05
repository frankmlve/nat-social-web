const NextI18Next = require('next-i18next/dist/commonjs').default

module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['es'],
  localeSubpaths: 'foreign', // locale subpaths for url could be none, foreign or all
})