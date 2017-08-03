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

  //delete function
  app.post('/complete/:id/delete', function(req, res){
    models.TodoList.findById(req.params.id).then(function(todo){
      if (todo) {
        todo.destroy().then(function () {
          res.redirect('/');
        });
      } else {
        res.status(404).send('Not found');
      }
    });
  });

  app.post('/detail/:id', function(req, res){
    var id = req.params.id;
    models.TodoList.findOne(
      {where: {id: id}}
    ).then(function(todo){
      res.render('detail', {model: todo});
    })
  })



  // edit function*****

  app.post('/edit/:id', function(req, res){
    var id = req.params.id;
    models.TodoList.findOne(
       {where: {id: id}}
    ).then(function (todo) {
      todo.name = req.body.editName;
      todo.save();
    }).then(function(){
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

  app.listen(3000);

})();
