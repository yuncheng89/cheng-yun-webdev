/**
 * Created by macbook on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, UserService) {
        var vm = this;
        var userId = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(userId);

            //console.log(vm.websites);

            vm.user = UserService.findUserById(userId);
        }

        init();
    }
})();
