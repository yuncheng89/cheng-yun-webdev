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
            vm.pages = PageService.findPageByWebsiteId(vm.wid);
        }
        init();

        function createPage(name, description) {
            var newPage = new Object();
            newPage.name = name;
            newPage.description = description;

            PageService.createPage(vm.uid, newPage);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page");
        }

    }
})();