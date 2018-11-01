'use strict';

const fs = require('fs');
const path = require('path');


module.exports = (sequelize, DataTypes) => {
    
    const Option = sequelize.define('Option', {
        key: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            primaryKey: true
        },
        displayName: DataTypes.STRING,
        value: {
            type: DataTypes.STRING,
            validate: {
                isSet(value) {
                    if (!value || value === '') throw new Error(_t('pebee.options.valueRequired'));
                }
            }
        },
        availableValues: DataTypes.ARRAY(DataTypes.STRING),
        isProtected: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        tableName: 'options',
        timestamps: true,
        paranoid: false
    });

    Option.systemKeys = function() {
        return ['lang'];
    }

    Option.getAvailableLanguages = function() {
        let values = fs.readdirSync(path.join(process.cwd(), 'translations')).map(languageFile => {
            let key = languageFile.split('.')[0];

            if (key && key !== '') {
                return { key: languageFile.split('.')[0], value: _t(`pebee.options.${key}`, key) };
            }
        });

        return {
            type: 'select',
            values
        };
    }

    Option.getAvailableOptions = function(key = '') {

        switch (key) {
            case 'lang':
                return this.getAvailableLanguages();
                
            default:
                let allOptions = {};

                this.systemKeys().forEach(systemKey => {
                    allOptions[systemKey] = Option.getAvailableOptions(systemKey);
                });

                return allOptions;
        }

    }

    Option.prototype.serialize = function() {
        let option = this.toJSON();

        option.displayName = _t(`pebee.options.${option.key}`, option.displayName);

        return option;
    }

    return Option;

};