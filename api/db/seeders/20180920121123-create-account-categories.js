'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('account_categories', [
            {
                id: 1,
                name: 'Administrator',
                label: 'admin',
                createdAt: new Date()
            },
            {
                id: 2,
                name: 'Subscriber',
                label: 'subscriber',
                createdAt: new Date()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('account_categories', null, {});
    }
};
