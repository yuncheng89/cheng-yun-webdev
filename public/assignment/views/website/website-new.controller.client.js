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

        function createWebsite(name, description) {
            var newWebsite = new Object();
            newWebsite.name = name;
            newWebsite.description = description;

            WebsiteService.createWebsite(vm.uid, newWebsite);
            $location.url("/user/"+vm.uid+"/website");
        }
    }
})();
