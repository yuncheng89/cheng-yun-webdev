/**
 * Created by macbook on 10/23/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location,
                                  WidgetService, $sce) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {
            vm.widget = WidgetService.findWidgetById(vm.wgid);
        }
        init();

        function createWidget(widgetType) {
            console.log(widgetType);
            var widget = WidgetService.createWidget(vm.pid, widgetType);
            console.log(widget.widgetType);
            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/" + widget._id);
        }

    }
})();
