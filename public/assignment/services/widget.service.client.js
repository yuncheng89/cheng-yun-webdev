/**
 * Created by macbook on 10/17/16.
 */

(function(){
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": 123, "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": 234, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": 345, "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": 456, "widgetType": "HTML", "pageId": "321", "text": '<p>Watchmaker <a href="http://gizmodo.com/tag/mbf" rel="nofollow">MB&amp;F</a> isn’t as well-known as  Rolex or Timex, but that’s because the company’s unique creations—like a <a href="http://gizmodo.com/listen-to-an-18-000-tie-fighter-music-box-play-the-sta-1717444112" rel="nofollow">TIE Fighter-shaped music box</a> that plays the <em>Star Wars</em> theme—are made for die-hard collectors. Its latest creation is a <a href="https://www.mbandf.com/en/machines/co-creations/astrograph" target="_blank" rel="noopener">rocket-shaped pen inspired by the moon landing</a>, and I’m desperately trying to justify…<span class="read-more-placeholder"></span><span class="readmore-core-decorated"></span></p>'},
            { "_id": 567, "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": 678, "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": 789, "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;

        function createWidget(pageId, widgetType) {
            var newWidget = new Object();

            var id = parseInt(Math.random() * 1000);
            while (findWidgetById(id)!=null) {
                id = parseInt(Math.random() * 1000);
            }

            newWidget._id = id;
            newWidget.widgetType = widgetType;
            newWidget.pageId = pageId;
            newWidget.text = "Enter widget text here";
            newWidget.size = 4;

            widgets.push(newWidget);
            return newWidget;
        }

        function findWidgetsByPageId(pageId) {

            var result = [];
            for(var g in widgets) {
                if(widgets[g].pageId === pageId) {
                    result.push(widgets[g]);
                }
            }
            return result;

            //return widgets;
        }

        function findWidgetById(widgetId) {
            for (var g in widgets) {
                if (widgets[g]._id == widgetId) {
                    console.log("Found widget with id "+widgetId);
                    return widgets[g];
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            //TODO
            return null;
        }

        function deleteWidget(widgetId) {
            var widget = findWidgetById(widgetId);
            var index = widgets.indexOf(widget);

            console.log("Widget to be deleted is at index "+index);

            if (index > -1) {
                widgets.splice(index, 1);
            }
        }
    }
})();

