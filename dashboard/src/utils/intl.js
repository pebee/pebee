// TODO: handling for dynamic languages
import { addLocaleData } from 'react-intl';
import config from './../config/intl.json';


let configObj = {};



if (config.languages && Array.isArray(config.languages)) {
    config.languages.forEach(locale => {
        let messages = require(`./../translations/${locale}.json`);
        configObj[locale] = messages;

        try {
            let localeData = require(`react-intl/locale-data/${locale}`);
            addLocaleData(localeData);
        } catch (e) {
            throw new Error(`react-intl does not support ${locale}`);
        }
    });
}



export default configObj;