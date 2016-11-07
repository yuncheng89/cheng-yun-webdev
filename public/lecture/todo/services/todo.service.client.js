/**
 * Created by macbook on 11/6/16.
 */
(function() {
    angular
        .module("TodoApp")
        .factory("TodoService", TodoService)

    function TodoService($http) {

        var api = {
            getAllTodos: getAllTodos,
            sort: sort
        };
        return api;

        function getAllTodos() {
            var url = "/api/lecture/todo";
            return $http.get(url);
        }

        function sort(start, end) {
            var url = "/api/lecture/todo?start=START&end=END";
            url = url
                .replace("START", start)
                .replace("END", end);
            return $http.put(url);
        }
    }

})();
