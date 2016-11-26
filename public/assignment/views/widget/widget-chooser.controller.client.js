/**
 * Created by macbook on 10/23/16.
 */

(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);

    function WidgetChooserController($routeParams, $location,
                                  WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        function init() {

        }
        init();

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType
            };
            //
            // //dummy values
            // newWidget.text = "Enter widget text here";
            // newWidget.size = 4;

            WidgetService
                .createWidget(vm.pid, newWidget)
                .success(function(addedWidget) { //Gets newly created WIDGET object from db in return

                    console.log("newly created widget's id: "+addedWidget._id);

                    $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+addedWidget._id);
                });
        }

    }
})();
