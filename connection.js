const Sequelize = require('sequelize');
const db = new Sequelize('todos', 'hardeek', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 15000
    }
});


const todo = db.define('todos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    task: Sequelize.STRING,
    done: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

async function f() {
    try {
        await db.authenticate();
        await db.sync();
    }
    catch (err) {
        console.log(err);
    }
}

f()


async function createTodo(newtask) {
    var newTodo = new todo({task: newtask});
    return (await newTodo.save());
}

function getAllTodos() {
    return todo.findAll({});
}

async function updateStatus(id, status) {
    return await todo.update({
        done: status
    }, {
        where: {
            id: id

        }
    })
}

async function deleteTodo(id) {
    return await todo.destroy({
        where: {
            id: id
        }
    })
}

async function updateAll(id, task) {
    return await todo.update({
        task: task
    }, {
        where: {
            id: id
        }
    });
}

module.exports = {
    db,
    createTodo, getAllTodos, deleteTodo, updateStatus,updateAll
};