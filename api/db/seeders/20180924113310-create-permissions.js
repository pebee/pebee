'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('permissions', [
            {
                name: 'Permission #1',
                label: 'permission-1',
                createdAt: new Date()
            },
            {
                name: 'Permission #2',
                label: 'permission-2',
                createdAt: new Date()
            },
            {
                name: 'Permission #3',
                label: 'permission-3',
                createdAt: new Date()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('permissions', null, {});
    }
};
