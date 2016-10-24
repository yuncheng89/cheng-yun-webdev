/**
 * Created by macbook on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);

        vm.createWebsite = createWebsite;

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.uid);
        }

        init();

        function createWebsite(website) {
            WebsiteService.createWebsite(vm.uid, website);
            $location.url("/user/"+vm.uid+"/website");
        }
    }
})();
