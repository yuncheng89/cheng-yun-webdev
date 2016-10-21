(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, UserService) {
        var vm = this;

        var userId = parseInt($routeParams['uid']);


        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(userId);

            console.log(vm.websites);

            vm.user = UserService.findUserById(userId);
        }
        init();

    }
})();