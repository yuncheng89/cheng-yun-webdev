/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;

        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];

        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function(website) {
                    vm.pages = website.pages;
                });
        }
        init();

        function createPage(page) {
            if (!page.name) {
                vm.error = "Name is required"
            }
            else {
                PageService
                    .createPage(vm.wid, page)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page");
                    });
            }
        }

    }
})();