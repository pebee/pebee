/**
 * PeBeeCMS API Bootstrap
 */

console.log('>>> Begin PeBee Bootstrap <<<');

// load .env configuration file at the beginning of bootstrap
const dotenv        = require('dotenv');
const env           = dotenv.config();

// include globaly used functions
const functions     = require('./../build/utils/functions');

// generate auth secret key for JWT
const uuidv4        = require('uuid/v4');
process.env.AUTH_SECRET_KEY = uuidv4();

// logger
const logger        = require('./../build/utils/logger').default;


// handle localization
const local         = require('./../build/utils/local');
const cache         = require('memory-cache');

global.memCache     = new cache.Cache();
global._t           = local._t;
local.changeLang('pl');


// api responses
const apiResponses  = require('./../build/utils/api/responses');

const fs            = require('fs');
const path          = require('path');
const models        = require(path.resolve(process.cwd(), 'db', 'models'));



const pebee = {
    extensions: [],
    models:     models,
    env:        env,
    functions:  functions,
    api: {
        responses: apiResponses
    },
    logger:     logger
};


let extensionsPath = process.cwd() + '/../extensions';

// load extensions
fs.readdirSync(process.cwd() + '/../extensions')
    .filter(extensionDir => {
        return extensionDir.indexOf('.') === -1
    })
    .forEach(extensionDir => {
    let extensionConfigFilePath = path.resolve(extensionsPath, extensionDir, 'extension.json');

    try {
        let extensionConfigFile = fs.readFileSync(extensionConfigFilePath);
        let extensionConfig = JSON.parse(extensionConfigFile);

        console.log(`>> Loading ${extensionConfig['name']} extension <<`);

        // call extension's API initialize function
        require(path.resolve(extensionsPath, extensionDir, 'api', 'config', 'initialize'))(pebee);
        
        pebee['extensions'][extensionConfig['slug']] = {};
    } catch (e) {
        let extensionPath = path.resolve(extensionsPath, extensionDir);
        throw new Error(`Extension at ${extensionPath} does not have required 'extension.json' file!`);
    }
});


// popularize global PeBee object
global.pebee = pebee;