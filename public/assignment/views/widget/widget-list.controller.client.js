/**
 * Created by macbook on 10/17/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams,
                                  WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;
        vm.checkSafeHtml = checkSafeHtml;
        vm.checkSafeYouTubeUrl = checkSafeYouTubeUrl;

        function init() {
            WidgetService
                .findAllWidgetsForPage(vm.pid)
                .success(function(page) {
                    vm.widgets = page.widgets.sort(sortByOrder); //Get widgets sorted by order

                });

            //The code below would make angular and jquery clash:
            // var widgets = $(".wam-widgets")
            //     .sortable({
            //         axis: 'y'
            //     });
            // console.log(widgets);
        }
        init();


        function sortByOrder(a,b) {
            if (a.order < b.order)
                return -1;
            if (a.order > b.order)
                return 1;
            return 0;
        }


        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            //console.log(url);
            var parts = url.split('/');
            var id= parts[parts.length-1];
            url = "https://www.youtube.com/embed/"+id;
            //console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

    }

})();