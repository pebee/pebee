'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTranslationsToMemory = exports._t = exports.changeLang = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var changeLang = function changeLang(langCode) {
  global.lang = langCode;
  loadTranslationsToMemory();
};

exports.changeLang = changeLang;

var _t = function _t(text) {
  // if lang is set to english, simply return the text
  if (lang === 'en') return text; // check if current language translations are in memory cache, if yes, return value from cache

  var translations = memCache.get('translations');
  if (translations) return translations[text] || text; // otherwise load translations to memory and return proper value

  loadTranslationsToMemory();
  return memCache.get('translations')[text] || text;
}; // load translations file for current language and put them in memory cache for 100 days


exports._t = _t;

var loadTranslationsToMemory = function loadTranslationsToMemory() {
  var translationsFilePath = _path.default.resolve(process.cwd(), 'translations', lang + '.json'),
      translationsCacheTime = 1000 * 3600 * 24,
      currentLangTranslations;

  try {
    currentLangTranslations = _fs.default.readFileSync(translationsFilePath);
  } catch (e) {
    // load default (english) translations
    translationsFilePath = _path.default.resolve(process.cwd(), 'translations', 'en.json');
    currentLangTranslations = _fs.default.readFileSync(translationsFilePath);
  }

  memCache.put('translations', JSON.parse(currentLangTranslations), translationsCacheTime);
};

exports.loadTranslationsToMemory = loadTranslationsToMemory;