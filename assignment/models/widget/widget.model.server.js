
module.exports = function () {
    var model = {};
    var mongoose = require("mongoose");
    var WidgetSchema = require("./widget.schema.server")();
    var WidgetModel = mongoose.model("WidgetModel", WidgetSchema);
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;
    function setModel(_model) {
        model = _model;
    }

    function createWidget(pageId, newWidget) {
        return model.pageModel
                    .findPageById(pageId)
                    .then(
                        function(pageObj){

                            var order = 0;
                            if (pageObj.widgets.length>0) {
                                var maxOrder = 0;
                                for (i = 0; i < pageObj.widgets.length; i++) {
                                    if (pageObj.widgets[i].order>maxOrder) {
                                        maxOrder = pageObj.widgets[i].order;
                                    }
                                }

                                order = maxOrder + 1;
                            } //The default order of the new widget is after the last widget on page

                            console.log("pageObj.widgets.length", pageObj.widgets.length);

                            var widgetObj = new WidgetModel();
                            widgetObj.widgetType = newWidget.widgetType;
                            widgetObj._page = pageId;
                            widgetObj.order = order;

                            pageObj.widgets.push(widgetObj);
                            pageObj.save();

                            return widgetObj.save();
                        },
                        function(error){
                            console.log("error: "+error);
                        });

    }

    function findAllWidgetsForPage(pageId) {
        return model.pageModel.findAllWidgetsForPage(pageId);
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, newWidget) {

        return WidgetModel
            .findById(widgetId)
            .then(
                function(widget) {
                    widget.name = newWidget.name;
                    widget.text = newWidget.text;
                    if (newWidget.placeholder) {
                        widget.placeholder = newWidget.placeholder;
                    }
                    if (newWidget.description) {
                        widget.description = newWidget.description;
                    }
                    if (newWidget.url) {
                        widget.url = newWidget.url;
                    }
                    if (newWidget.width) {
                        widget.width = newWidget.width;
                    }
                    if (newWidget.height) {
                        widget.height = newWidget.height;
                    }
                    if (newWidget.rows) {
                        widget.rows = newWidget.rows;
                    }
                    if (newWidget.size) {
                        widget.size = newWidget.size;
                    }
                    if (newWidget.class) {
                        widget.class = newWidget.class;
                    }
                    if (newWidget.icon) {
                        widget.icon = newWidget.icon;
                    }
                    if (newWidget.deletable || !newWidget.deletable) {
                        widget.deletable = newWidget.deletable;
                    }
                    if (newWidget.formatted || !newWidget.deletable) {
                        widget.formatted = newWidget.formatted;
                    }
                    return widget.save();
                }
            );


        // return WidgetModel //return promise
        //     .update(
        //         {
        //             _id: widgetId
        //         },
        //         {
        //             name: widget.name,
        //             text: widget.text,
        //             // placeholder: widget.placeholder,
        //             // description: widget.description,
        //             url: widget.url,
        //             width: widget.width,
        //             // height: widget.height,
        //             // rows: widget.rows,
        //             size: widget.size,
        //             // class: widget.class,
        //             // icon: widget.icon
        //         }
        //     );
    }

    function deleteWidget(widgetId) {
        return WidgetModel
            .remove({_id: widgetId});
    }
    function reorderWidget(pageId, start, end) {

        console.log("start %s end %s", start, end);

        start = parseInt(start);
        end = parseInt(end);
        return WidgetModel
            .find({_page: pageId}) //find all widgets with this pageId
            .then(
                function(widgets) {
                    widgets
                        .forEach(
                            function(widget){ //for each widget, increase or decrease its index based on start & finish

                                console.log("current widget's position: "+widget.order);

                                if(start < end) { //move down
                                    if(widget.order < start) {
                                        //this widget is not affected
                                    } else if(widget.order === start) {
                                        widget.order = end;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > start && widget.order <= end) {
                                        widget.order--;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > end) {

                                    }
                                } else { //move up
                                    if(widget.order < end) {
                                        //this widget is not affected
                                    } else if(widget.order === start) {
                                        widget.order = end;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order < start && widget.order >= end) {
                                        widget.order++;
                                        widget.save(function(err,doc){});
                                    } else if(widget.order > start) {

                                    }
                                }
                            }
                        );
                },
                function(err) {

                }
            );
    }
};

