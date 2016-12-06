/**
 * Created by macbook on 10/17/16.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;

        vm.uid = $routeParams['uid'];

        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesForUser(vm.uid)
                .success(function(user){
                    vm.websites = user.websites;
                });

            console.log(vm.websites);
        }

        init();

        function createWebsite(website) {


            WebsiteService
                .createWebsite(vm.uid, website)
                .success(function () {
                    $location.url("/user/"+vm.uid+"/website");
                });
        }
    }
})();
