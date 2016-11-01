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
                .success(function(widgets) {
                    vm.widgets = widgets;
                });

            // var widgets = $(".wam-widgets")
            //     .sortable({
            //         axis: 'y'
            //     });
            // console.log(widgets);
        }
        init();

        function checkSafeHtml(html) {
            return $sce.trustAsHtml(html);
        }

        function checkSafeYouTubeUrl(url) {
            console.log(url);
            var parts = url.split('/');
            var id= parts[parts.length-1];
            url = "https://www.youtube.com/embed/"+id;
            console.log(url);
            return $sce.trustAsResourceUrl(url);
        }

    }

})();