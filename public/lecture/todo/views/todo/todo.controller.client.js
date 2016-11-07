/**
 * Created by macbook on 11/6/16.
 */
(function() {
    angular
        .module("TodoApp")
        .controller("TodoListController", TodoListController)

    function TodoListController(TodoService) {
        var vm = this;

        TodoService
            .getAllTodos()
            .success(function (todos) {
                vm.todos = todos;
            });
    }


})();