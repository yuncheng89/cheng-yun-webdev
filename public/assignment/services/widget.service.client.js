(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {

        var api = {
            createWidget: createWidget,
            findAllWidgetsForPage: findAllWidgetsForPage,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            sort: sort
        };
        return api;

        function createWidget(pageId, newWidget) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, newWidget);
        }

        function findAllWidgetsForPage(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widget) {
            var url = "/api/widget/"+widget._id;
            return $http.put(url, widget);
        }

        function deleteWidget(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }
        function sort(pageId, start, end) {
            var url = "/api/page/"+pageId+"/widget?initial=index1&final=index2";
            url = url
                .replace("index1", start)
                .replace("index2", end);
            return $http.put(url);
        }
    }
})();

