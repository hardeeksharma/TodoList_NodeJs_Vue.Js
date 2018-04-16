const route = require('express').Router();
var jsonfile = require('jsonfile')

let todos = [];
let filePath = "todos.json";
route.get('/', (req, res) => {

    todos = jsonfile.readFileSync(filePath);
    res.send(todos.map((v, i) => {
        v.id = i;
        return v;
    }))
})

route.post('/', (req, res) => {
    let newTodo = {
        task: req.body.task,
        done: req.body.done == 'true' ? true : false
    }

    todos = jsonfile.readFileSync(filePath);

    todos.push(newTodo);
    jsonfile.writeFileSync(filePath, todos);
    res.json({
        success: true,
        id: todos.length - 1
    });

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

    todos = jsonfile.readFileSync(filePath);

    var ids = (req.params.id).split(',');

    ids.reverse().forEach(item => {
        todos.splice(parseInt(item), 1);
    })

    jsonfile.writeFileSync(filePath, todos);

    res.json({
        success: true,
        id: todos.length - 1
    });

})

route.put('/', (req, res) => {
    todos = req.body.todos;
    jsonfile.writeFileSync(filePath, todos);
    res.json({
        success: true,
        msg: "Todo List updated."
    });
})

route.put('/updateStatus', (req, res) => {

    todos = jsonfile.readFileSync(filePath);

    var index = req.body.tid;
    var status = req.body.tstatus;
    todos[index].done = status;

    jsonfile.writeFileSync(filePath,todos);

    res.json({
        success: true,
        msg: "Todo List status updated."
    });
})

module.exports = route;