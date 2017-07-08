(function(){
  'use strict';

  const express = require('express');
  const mustacheExpress = require('mustache-express');
  const bodyParser = require('body-parser');

  const models = require('./models');

  const app = express();



  app.engine('mustache', mustacheExpress());
  app.set('view engine', 'mustache');
  app.set('views', './views');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.get('/', function(req, res){
    models.TodoList.findAll().then(function(todos){
      res.render('index', {model: todos});
    });
  });

  app.post('/', function(req, res){
    var name = req.body.todoInput;

    models.TodoList.create({
      name: name
      , completed: false
    });
    res.redirect('/');
  });

  app.post('/complete/:id', function(req, res){
    var id = req.params.id;
    models.TodoList.update(
      {completed: true}
      , {where: {id: id}}
    ).then(function () {
      res.redirect('/');
    });
  });
  // let todoList = 0;
  // let completedTodos = 0;
 //
 //  models.TodoList.create({
 //  name: "wash dishes",
 //  details: "empty dish washer then take dishes from sink and fill dish washer",
 //  submit_date: new Date (2017-28-6)
 // });
 //
 // models.todoList.findOne({
 //   where: {
 //     todo: "wash dishes"
 //   }
 // }).then(function(todoList){
 //   console.log(todoList.details);
 // });



  // var context = {
  //   todoList:["make todoList"],
  //   todoId: function(){
  //     return todoList++;
  //   }
  //   , completed: ["completed"],
  //   completedId: function(){
  //     return completedTodos++;
  //   }
  // };






  // app.post('/', function(req, res){
  //   var todo = context.todoList;
  //   todo.push(req.body.todoInput);
  //   res.redirect('/');
  // });

// /todo/{{id}}/complete/
  // app.post('/todo/:id/complete/', function(req, res){
  //   var index = req.params.id;
  //   var todoRemove = context.todoList.splice(id, 1);
  //   context.completedTodos.push(todoRemove);

    // remove that index from the todo list

    // add that index to the completed list

  //   res.redirect('/');
  // });
  //
  app.listen(3000);
  //   console.log("stuff");
  // });
})();
