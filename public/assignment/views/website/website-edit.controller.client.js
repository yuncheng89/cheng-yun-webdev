/**
 * Created by macbook on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);
        var websiteId = parseInt($routeParams['wid']);
        console.log("websiteId:", websiteId);

        function init() {
            vm.user = UserService.findUserById(userId);
            vm.websites = WebsiteService.findWebsitesForUser(userId);

            vm.website = WebsiteService.findWebsiteById(websiteId);
        }

        init();
    }

})();
