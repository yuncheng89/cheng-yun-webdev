/**
 * Created by macbook on 10/31/16.
 */
(function () {
    angular
        .module("mnDirectives", [])
        .directive("mnSortable", mnSortable); //mn-sortable

    function mnSortable() {
        console.log("Hello from mmSortable");

        function linker(scope, element, attributes) {
            var start = -1;
            var end = -1;

            element
                .sortable({
                    start: function(event, ui) {
                        start = $(ui.item).index();
                    },
                    stop: function(event, ui) {
                        end = $(ui.item).index();
                        scope.sortableController.sort(start, end);
                    }

                });
        }

        return {
            scope: {
            },
            link: linker,
            controller: sortableController,
            controllerAs: 'sortableController'
        }
    }

    function sortableController(TrackService, $routeParams) {
        var vm = this;
        vm.sort = sort;
        vm.pid = $routeParams['pid'];

        function sort(start, end) {
            TrackService.sort(vm.pid, start, end);
        }



    }
})();
