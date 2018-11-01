'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('options', {
            key: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            displayName: Sequelize.STRING,
            value: {
                type: Sequelize.STRING,
                allowNull: false
            },
            availableValues: Sequelize.ARRAY(Sequelize.STRING),
            isProtected: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updatedAt: Sequelize.DATE
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('options');
    }
};
