(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function(pages) {
                    vm.pages = pages;
                });
        }
        init();

    }
})();