/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService, UserService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);

        function init() {
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.user = UserService.findUserById(userId);
        }
        init();

    }
})();