/**
 * Created by macbook on 11/6/16.
 */
(function() {
    angular
        .module("TodoApp")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/todo", {
                templateUrl: "views/todo/todo-list.view.client.html",
                controller: "TodoListController",
                controllerAs: "model"
            })
    }

})();
