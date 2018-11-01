'use strict';


/**
 * Get current language from database and put it in the request
 */
export const loadLanguage = (req, res, next) => {

    // set language setting cache time to 24 hours
    let langCacheTime = 1000 * 3600 * 24;

    pebee.models.Option.findById('lang').then(language => {
        req.lang = language.get('value');
        memCache.put('lang', req.lang, langCacheTime);

        next();
    });

};