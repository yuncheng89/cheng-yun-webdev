/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, UserService, WebsiteService, PageService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        var pageId = parseInt($routeParams['pid']);

        function init() {
            vm.user = UserService.findUserById(userId);
            vm.website = WebsiteService.findWebsiteById(websiteId);
            vm.pages = PageService.findPageByWebsiteId(websiteId);
            vm.page = PageService.findPageById(pageId);
        }
        init();

    }
})();