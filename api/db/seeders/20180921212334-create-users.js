'use strict';

const bcrypt = require('bcryptjs');

let password = 'password';


module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('users', [
            {
                username: 'user #1',
                email: 'user1@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 1,
                createdAt: new Date()
            },
            {
                username: 'user #2',
                email: 'user2@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 1,
                createdAt: new Date()
            },
            {
                username: 'user #3',
                email: 'user3@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 1,
                createdAt: new Date()
            },
            {
                username: 'user #4',
                email: 'user4@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 2,
                createdAt: new Date()
            },
            {
                username: 'user #5',
                email: 'user5@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 2,
                createdAt: new Date()
            },
            {
                username: 'user #6',
                email: 'user6@example.com',
                password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
                accountCategoryId: 2,
                createdAt: new Date()
            }
        ]);
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('users', null, {});
    }
};
