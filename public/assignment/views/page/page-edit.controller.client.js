/**
 * Created by macbook on 10/20/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, $location, PageService) {
        var vm = this;

        vm.uid = parseInt($routeParams['uid']);
        vm.wid = parseInt($routeParams['wid']);
        vm.pid = parseInt($routeParams['pid']);

        vm.deletePage = deletePage;

        function init() {
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
            vm.page = PageService.findPageById(vm.pid);
        }
        init();

        function deletePage() {
            console.log("Delete page "+vm.pid);
            PageService.deletePage(vm.pid);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }

    }
})();