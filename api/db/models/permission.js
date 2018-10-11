'use strict';

const slugify = require('slugify');


module.exports = (sequelize, DataTypes) => {

    const Permission = sequelize.define('Permission', {
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
            beforeValidate: (permission, options) => {
                permission.label = slugify(permission.name).toLowerCase();
            }
        },
        tableName: 'permissions',
        timestamps: true,
        paranoid: true
    });

    Permission.associate = function(models) {
        this.belongsToMany(models.AccountCategory, { as: 'AccountCategories', through: models.AccountCategoryPermissions, foreignKey: 'permissionId' });
    };

    Permission.prototype.serialize = function() {
        let keys = ['id', 'name', 'label'],
            permission = {};

        keys.forEach(key => {
            permission[key] = this.get(key);
        });

        return permission;
    };

    return Permission;

};