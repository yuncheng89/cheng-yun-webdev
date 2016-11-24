/**
 * Created by macbook on 10/17/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        console.log("websiteId:", vm.wid);

        vm.deleteWebsite  = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {

            WebsiteService
                .findWebsitesForUser(vm.uid)
                .success(function(user){
                    vm.websites = user.websites;
                });

            WebsiteService
                .findWebsiteById(vm.wid)
                .success(function (website) {
                    vm.website = website;
                });
        }
        init();

        function deleteWebsite() {
            console.log("Delete website "+vm.wid);
            WebsiteService
                .deleteWebsite(vm.wid)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website");
                });
        }

        function updateWebsite() {
            WebsiteService
                .updateWebsite(vm.website)
                .success(function () {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
    }

})();
