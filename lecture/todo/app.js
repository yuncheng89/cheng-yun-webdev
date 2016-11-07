module.exports = function(app) {
    console.log("Hello from the server todo app");
    app.get("/api/lecture/todo", getAllTodos);
    app.put("/api/lecture/todo", updateTodos);


    var todos = [
        {_id:123, title:'Todo 123'},
        {_id:234, title:'Todo 234'},
        {_id:345, title:'Todo 345'},
        {_id:456, title:'Todo 456'},
        {_id:567, title:'Todo 567'}
    ];

    function getAllTodos(req, res) {
        res.json(todos);
    }

    function updateTodos(req, res) {
        var start = req.query.start;
        var end = req.query.end;
        todos.splice(end, 0, todos.splice(start, 1)[0]);
    }

};