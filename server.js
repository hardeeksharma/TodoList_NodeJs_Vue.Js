const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use('/', express.static(path.join(__dirname, 'public')));

const routes = {
    todos: require('./todos')
}

app.use('/todos', routes.todos)
app.listen(5050, function () {
    console.log("server started");
})