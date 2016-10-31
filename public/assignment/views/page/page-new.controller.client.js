/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, $location, PageService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);

        vm.createPage = createPage;

        function init() {
            PageService
                .findAllPagesForWebsite(vm.wid)
                .success(function(pages) {
                    vm.pages = pages;
                });
        }
        init();

        function createPage(page) {
            page._id = (new Date()).getTime();
            page.websiteId = vm.wid;
            PageService
                .createPage(vm.wid, page)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
                });
        }

    }
})();