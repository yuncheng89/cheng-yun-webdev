/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, UserService, WebsiteService, PageService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
        init();

    }
})();