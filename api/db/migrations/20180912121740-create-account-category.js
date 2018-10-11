'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('account_categories', {
          id: {
              type: Sequelize.INTEGER,
              primaryKey: true,
              allowNull: false,
              autoIncrement: true
          },
          name: {
              type: Sequelize.STRING,
              allowNull: false
          },
          label: {
              type: Sequelize.STRING,
              allowNull: false,
              unique: true
          },
          isProtected: {
              type: Sequelize.BOOLEAN,
              allowNull: false,
              defaultValue: false
          },
          createdAt: {
              type: Sequelize.DATE,
              allowNull: false
          },
          updatedAt: Sequelize.DATE,
          deletedAt: Sequelize.DATE
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('account_categories');
  }
};
