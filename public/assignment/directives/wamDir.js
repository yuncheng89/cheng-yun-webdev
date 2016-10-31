/**
 * Created by macbook on 10/31/16.
 */
(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable); //wam-sortable

    //TODO: make assignment depend on this directive

    function wamSortable() {
        console.log("Hello from Sortable");
    }
})();
