const route = require('express').Router();
var jsonfile = require('jsonfile')

let todos = [];
let filePath = "todos.json";

const db = require('./connection')

//RETURN LIST OF ALL TODOS
route.get('/', (req, res) => {
    db.getAllTodos().then((result) => {
        res.json(result)
    }).catch(err => console.log(err))
})

// CREATE A NEW TODOLIST ITEM
route.post('/', (req, res) => {
    db.createTodo(req.body.task).then((result) => {
        console.log("todo inserted")
        res.json({
            success: true,
            id: todos.length - 1
        });
    }).catch(err => console.log(err))

});

route.get('/:id', (req, res) => {
    todos = jsonfile.readFileSync(filePath);
    res.json(todos[req.params.id])
})

route.delete('/:id', (req, res) => {

    todos = jsonfile.readFileSync(filePath);
    todos.splice(req.params.id, 1);
    jsonfile.writeFileSync(filePath, todos);
    res.json(todos);

})

route.delete('/deleteBatch/:id', (req, res) => {

    var ids = (req.params.id).split(',');

    new Promise((resolve) => {
        ids.forEach(item => {
            db.deleteTodo(parseInt(item))
        })
        resolve();
    }).then(() => {
        res.json({
            success: true,
            id: todos.length - 1
        });
    })
})

route.put('/', (req, res) => {

    todos = req.body.todos;
    new Promise((resolve) => {

        todos.forEach((v) => {
            db.updateAll(v.id, v.task)
        })

        resolve();

    }).then(() => {
        res.json({
            success: true,
            msg: "Todo List updated."
        });

    })

})

route.put('/updateStatus', (req, res) => {


    var index = req.body.tid;
    var status = req.body.tstatus;
    //todos[index].done = status;

    db.updateStatus(index, status).then(() => {
        res.json({
            success: true,
            msg: "Todo List status updated."
        });
    }).catch(err => console.log(err));
})

module.exports = route;