const models = require("../models");

'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    models.TodoList.findAll({
      where: {
        assignee: null
      }
    }).then(function(todos) {
      todos.forEach(function(todo) {
        todo.assignee = 'me';
        todo.save();
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    // no down
  }
};
