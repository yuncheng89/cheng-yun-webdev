/**
 * Created by macbook on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService, UserService) {
        var vm = this;
        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        console.log("websiteId:", vm.wid);

        vm.deleteWebsite  = deleteWebsite;

        function init() {
            vm.user = UserService.findUserById(vm.uid);
            vm.websites = WebsiteService.findWebsitesForUser(vm.uid);
            vm.website = WebsiteService.findWebsiteById(vm.wid);
        }

        init();

        function deleteWebsite() {
            console.log("Delete website "+vm.wid);
            WebsiteService.deleteWebsite(vm.wid);
            $location.url("/user/"+vm.uid+"/website");
        }
    }

})();
