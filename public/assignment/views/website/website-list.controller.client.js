(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        vm.uid = $routeParams['uid'];

        function init() {
            WebsiteService
                .findWebsitesForUser(vm.uid)
                .success(function(user){ //Gets USER object in return
                    vm.websites = user.websites;
                });
        }
        init();
    }
})();