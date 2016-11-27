
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
                            var widgetObj = new WidgetModel();
                            widgetObj.widgetType = newWidget.widgetType;
                            widgetObj._page = pageObj._id;

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
    }
};

