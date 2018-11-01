'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const _ = require('underscore');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/database.json')[env];
const db = {};


let sequelize,
    user,
    userExtension;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}


// find and load PeBee base models
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        if (file !== 'user.js') {
            const model = sequelize['import'](path.join(__dirname, file));
            db[model.name] = model;
        } else {
            user = require(path.join(__dirname, file))(sequelize, Sequelize);
        }
    });




// iterate over extensions and load their models
let extensionsDir = process.cwd() + '/../extensions';
fs.readdirSync(extensionsDir)
    .filter(singleExtensionDir => { return (singleExtensionDir.indexOf('.') === -1 && singleExtensionDir !== 'node_modules'); })
    .forEach(singleExtensionDir => {
        let extensionPath = path.resolve(extensionsDir, singleExtensionDir);

        let extensionConfigFile,
            extensionConfig;
        try {
            extensionConfigFile = fs.readFileSync(path.resolve(extensionPath, 'extension.json'));
        } catch (e) {
            throw new Error(`Extension at ${extensionPath} does not have required 'extension.json' file!`);
        }

        // load extension configuration file if it existed
        if (extensionConfigFile) {
            extensionConfig = JSON.parse(extensionConfigFile);
        }
        
        // default extension models' path
        let modelsPath = path.resolve(extensionPath, 'api', 'models');
        // if extension's extension.json file specifies models path, use this instead of default
        if (extensionConfig && extensionConfig['models-path']) {
            modelsPath = path.resolve(extensionPath, extensionConfig['models-path']);
        }

        try {
            // iterate over extension's models' path and import them via sequelize
            fs.readdirSync(modelsPath)
                .filter(file => {
                    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
                })
                .forEach(file => {
                    // omit importing user.js file because it is used to extend system user model
                    if (file !== 'user.js') {
                        const model = sequelize['import'](path.join(modelsPath, file));
                        db[model.name] = model;
                    } else {
                        // load extension user additional configuration
                        userExtension = require(path.join(modelsPath, file))(sequelize, Sequelize);

                        // extend base model attributes, hooks, scopes and validators
                        // while extending we omit base model already defined attributes, hooks, scopes and validators
                        _.extend(user.attributes, _.omit(userExtension.attributes, _.keys(user.attributes)));
                        _.extend(user.options.hooks, _.omit(userExtension.hooks, _.keys(user.options.hooks)));
                        _.extend(user.options.scopes, _.omit(userExtension.scopes, _.keys(user.options.scopes)));
                        _.extend(user.options.validate, _.omit(userExtension.validate, _.keys(user.options.validate)));
                    }
                });
        } catch (e) {
            
        }
    
});


// create system user model
const User = sequelize.define('User', user.attributes, user.options);

// Assign instance methods to User model
for (var methodName in user.instanceMethods) {
    if (user.instanceMethods.hasOwnProperty(methodName)) {
        User.prototype[methodName] = user.instanceMethods[methodName];
    }
}

// Assign class methods to User model
for (var methodName in user.classMethods) {
    if (user.classMethods.hasOwnProperty(methodName)) {
        User[methodName] = user.classMethods[methodName];
    }
}

db['User'] = User;


// create associations between models and assign them to 'db' object
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db;
