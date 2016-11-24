(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

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