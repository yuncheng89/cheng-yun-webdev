/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;
        vm.uid = $routeParams['uid'];
        vm.wid = $routeParams['wid'];
        vm.pid = $routeParams['pid'];

        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function(website) {
                    vm.pages = website.pages;
                });

            PageService
                .findPageById(vm.pid)
                .success(function(page) {
                    vm.page = page;
                    console.log("found page by id: "+vm.page);
                });
        }
        init();

        function deletePage() {
            console.log("Delete page "+vm.pid);
            PageService
                .deletePage(vm.pid)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                });
        }

        function updatePage() {
            PageService
                .updatePage(vm.page)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                });
        }

    }
})();