/**
 * Created by macbook on 10/19/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($routeParams, $location,
                                  WidgetService, $sce) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.deleteWidget  = deleteWidget;
        vm.updateWidget = updateWidget;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

        function deleteWidget() {
            console.log("Delete widget "+vm.wgid);
            WidgetService.deleteWidget(vm.wgid);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
        }

        function updateWidget(size, width, text, url) {
            var updated = {_id: vm.wgid, widgetType: vm.widget.widgetType, pageId: vm.pid, size: size, width: width, text: text, url: url};
            WidgetService.updateWidget(vm.pid, updated);
            vm.widget = updated;
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
        }

    }
})();
