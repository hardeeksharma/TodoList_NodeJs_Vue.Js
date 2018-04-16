let app = new Vue({
    el: '#app',
    data: {
        newtask: "",
        message: 'hello',
        todos: [
            {task: 'new task', done: false},
            {task: 'task 2', done: true},
            {task: 'a', done: false},
            {task: 'b', done: true}
        ]
    },
    methods: {
        addTodo() {
            this.todos.push({task: this.newtask, done: false});
        },
        changeTicketStatus() {
            console.log("i am changed");
            console.log(JSON.stringify(this.todos));
        },
        clearList() {
            this.todos = this.todos.filter(function (v) {
                return v.done == false;
            });
        }
    }
})