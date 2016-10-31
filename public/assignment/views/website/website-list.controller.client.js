(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);

        function init() {
            WebsiteService
                .findWebsitesForUser(vm.uid)
                .success(function (websites) {
                    vm.websites = websites;
                });
        }
        init();
    }
})();