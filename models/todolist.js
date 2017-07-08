'use strict';
module.exports = function(sequelize, DataTypes) {
  var TodoList = sequelize.define('TodoList', {
    // id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    details: DataTypes.STRING,
    submit_date: DataTypes.DATEONLY,
    completed: DataTypes.BOOLEAN,
    assignee: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return TodoList;
};
