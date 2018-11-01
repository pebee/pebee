'use strict';
/**
 * Get current language from database and put it in the request
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLanguage = void 0;

var loadLanguage = function loadLanguage(req, res, next) {
  // set language setting cache time to 24 hours
  var langCacheTime = 1000 * 3600 * 24;
  pebee.models.Option.findById('lang').then(function (language) {
    req.lang = language.get('value');
    memCache.put('lang', req.lang, langCacheTime);
    next();
  });
};

exports.loadLanguage = loadLanguage;