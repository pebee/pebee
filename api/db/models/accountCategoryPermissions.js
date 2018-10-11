'use strict';


module.exports = (sequelize, DataTypes) => {

    const AccountCategoryPermissions = sequelize.define('AccountCategoryPermissions', {
        accountCategoryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: sequelize.models.AccountCategory,
                key: 'id'
            }
        },
        permissionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: sequelize.models.Permission,
                key: 'id'
            }
        }
    }, {
        tableName: 'account_category_permissions',
        timestamps: false
    });

    return AccountCategoryPermissions;

};