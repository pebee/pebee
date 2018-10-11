'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('account_category_permissions', [
            {
                accountCategoryId: 1,
                permissionId: 1
            },
            {
                accountCategoryId: 1,
                permissionId: 2
            },
            {
                accountCategoryId: 1,
                permissionId: 3
            },
            {
                accountCategoryId: 1,
                permissionId: 4
            },
            {
                accountCategoryId: 1,
                permissionId: 5
            },
            {
                accountCategoryId: 1,
                permissionId: 6
            },
            {
                accountCategoryId: 1,
                permissionId: 7
            },
            {
                accountCategoryId: 1,
                permissionId: 8
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('account_category_permissions', null, {});
    }
};
