/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, UserService, WebsiteService, PageService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.pid = parseInt($routeParams['pid']);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
            vm.page = PageService.findPageById(vm.pid);
        }
        init();

    }
})();