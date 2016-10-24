(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);

        function init() {
            vm.websites = WebsiteService.findWebsitesForUser(vm.uid);

            console.log(vm.websites);

        }
        init();


    }
})();