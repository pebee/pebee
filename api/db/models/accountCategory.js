'use strict';

const slugify = require('slugify');


module.exports = (sequelize, DataTypes) => {

    const AccountCategory = sequelize.define('AccountCategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        label: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        hooks: {
            beforeValidate: (accountCategory, options) => {
                accountCategory.label = slugify(accountCategory.name).toLowerCase();
            }
        },
        getterMethods: {
            isDeleted: function() {
                return !!this.getDataValue('deletedAt');
            }
        },
        scopes: {
            withPermissions: function() {
                return {
                    include: {
                        model: sequelize.models.Permission,
                        as: 'Permissions'
                    }
                };
            }
        },
        tableName: 'account_categories',
        timestamps: true,
        paranoid: true
    });

    AccountCategory.associate = function(models) {
        this.belongsToMany(models.Permission, { as: 'Permissions', through: models.AccountCategoryPermissions, foreignKey: 'accountCategoryId' });
    };

    AccountCategory.prototype.serialize = function() {
        let keys = ['id', 'name', 'label', 'isDeleted'],
            accountCategory = {};

        keys.forEach(key => {
            accountCategory[key] = this.get(key);
        });

        accountCategory.permissions = this.Permissions ? this.Permissions.map(permission => { return permission.serialize(); }) : this.Permissions;

        return accountCategory;
    };

    return AccountCategory;

};