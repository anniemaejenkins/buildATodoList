'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Todos',
      'assignee',
      {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'me'
      }
    );
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Todos',
      'assignee',
      {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
      }
    );
  }
};
