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
            WidgetService
                .findWidgetById(vm.wgid)
                .success(function(widget) {
                    vm.widget = widget;
                });
        }
        init();

        function deleteWidget() {
            console.log("Delete widget "+vm.wgid);
            WidgetService
                .deleteWidget(vm.wgid)
                .success(function() {
                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget");
                });
        }

        function updateWidget() {
            console.log("Update widget "+vm.wgid);

            if (!vm.widget.name) {
                vm.error = "Name is required"
            }
            else {
                WidgetService
                    .updateWidget(vm.widget)
                    .success(function () {
                        $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
                    });
            }
        }
    }
})();
