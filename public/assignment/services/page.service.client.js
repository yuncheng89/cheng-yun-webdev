(function(){
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": 321, "name": "Post 1", "websiteId": 456, "description": "Lorem" },
            { "_id": 432, "name": "Post 2", "websiteId": 456, "description": "Lorem" },
            { "_id": 543, "name": "Post 3", "websiteId": 456, "description": "Lorem" }
        ];

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;

        function createPage(websiteId, page) {
            //TODO
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var p in pages) {
                if(pages[p].websiteId == websiteId) {
                    result.push(pages[p]);
                }
            }
            return result;
        }

        function findPageById(pageId) {
            for(var p in pages) {
                if(pages[p]._id === pageId) {
                    return pages[p];
                }
            }
        }

        function updatePage(pageId, page) {
            //TODO
        }

        function deletePage(pageId) {
            var page = findPageById(pageId);
            var index = pages.indexOf(page);

            console.log("Page to be deleted is at index "+index);

            if (index > -1) {
                pages.splice(index, 1);
            }
        }

    }
})();