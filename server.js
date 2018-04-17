const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static(path.join(__dirname, 'public')));

const routes = {
    todos: require('./todos'),
    todos_db:require('./todos_sequalize')
}

app.use('/todos', routes.todos_db)
app.listen(5050, function () {
    console.log("server started");
})