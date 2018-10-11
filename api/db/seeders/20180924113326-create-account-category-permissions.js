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
                accountCategoryId: 2,
                permissionId: 3
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('account_category_permissions', null, {});
    }
};
