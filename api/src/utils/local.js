'use strict';

import fs from 'fs';
import path from 'path';


export const changeLang = (langCode) => {
    let langCacheTime = 1000 * 3600 * 24;

    memCache.put('lang', langCode, langCacheTime);
    loadTranslationsToMemory();
};

export const _t = (text, defaultText) => {
    // check if current language translations are in memory cache, if yes, return value from cache
    let translations = memCache.get('translations');
    if (translations) return translations[text] || defaultText;

    // otherwise load translations to memory and return proper value
    loadTranslationsToMemory();
    return memCache.get('translations')[text] || defaultText;
};


// load translations file for current language and put them in memory cache for 100 days
export const loadTranslationsToMemory = () => {
    let translationsFilePath = path.resolve(process.cwd(), 'translations', memCache.get('lang') + '.json'),
        translationsCacheTime = 1000 * 3600 * 24,
        currentLangTranslations;

    try {
        currentLangTranslations = fs.readFileSync(translationsFilePath);
    } catch (e) {
        // load default (english) translations
        translationsFilePath = path.resolve(process.cwd(), 'translations', 'en.json');
        currentLangTranslations = fs.readFileSync(translationsFilePath);
    }

    memCache.put('translations', JSON.parse(currentLangTranslations), translationsCacheTime);
    
};