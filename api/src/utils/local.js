'use strict';

import fs from 'fs';
import path from 'path';


export const changeLang = (langCode) => {
    global.lang = langCode;
    loadTranslationsToMemory();
};

export const _t = (text) => {
    // if lang is set to english, simply return the text
    if (lang === 'en') return text;

    // check if current language translations are in memory cache, if yes, return value from cache
    let translations = memCache.get('translations');
    if (translations) return translations[text] || text;

    // otherwise load translations to memory and return proper value
    loadTranslationsToMemory();
    return memCache.get('translations')[text] || text;
};


// load translations file for current language and put them in memory cache for 100 days
export const loadTranslationsToMemory = () => {
    let translationsFilePath = path.resolve(process.cwd(), 'translations', lang + '.json'),
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