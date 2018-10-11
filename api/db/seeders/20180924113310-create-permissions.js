'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('permissions', [
            {
                name: 'Can view users',
                label: 'can-view-users',
                createdAt: new Date()
            },
            {
                name: 'Can add users',
                label: 'can-add-users',
                createdAt: new Date()
            },
            {
                name: 'Can update users',
                label: 'can-update-users',
                createdAt: new Date()
            },
            {
                name: 'Can delete users',
                label: 'can-delete-users',
                createdAt: new Date()
            },
            {
                name: 'Can view account categories',
                label: 'can-view-account-categories',
                createdAt: new Date()
            },
            {
                name: 'Can edit account categories',
                label: 'can-edit-account-categories',
                createdAt: new Date()
            },
            {
                name: 'Can add account categories',
                label: 'can-add-account-categories',
                createdAt: new Date()
            },
            {
                name: 'Can delete account categories',
                label: 'can-delete-account-categories',
                createdAt: new Date()
            },
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('permissions', null, {});
    }
};
