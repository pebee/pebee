'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('options', [
            {
                key: 'lang',
                displayName: 'Language',
                value: 'en',
                availableValues: ['pl', 'en'],
                isProtected: true,
                createdAt: new Date()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('options', null, {});
    }
};
